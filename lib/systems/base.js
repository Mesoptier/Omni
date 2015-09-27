var async = require("async");
var {EventEmitter2: EventEmitter} = require("eventemitter2");
var mpath = require("path").posix;
var {Minimatch} = require("minimatch");

export default class Base {

  walk(root, glob, concurrency = 1) {
    if (glob)
      var mm = new Minimatch(glob);

    var emitter = new EventEmitter();
    var queue = async.queue(_walk.bind(this), concurrency);

    queue.drain = () => {
      emitter.emit("end");
      queue.kill();
    };

    queue.push(root);

    return emitter;

    function _walk(path, callback) {
      return this
        .readdir(path)
        .each((file) => {
          var relative = mpath.relative(root, file);

          // If there is no partial match, don't make the stat call
          if (mm && !mm.match(relative, true))
            return;

          return this
            .statType(file)
            .then((type) => {
              if (type == "directory")
                queue.push(file);

              // If there is no full match, don't emit events
              if (mm && !mm.match(relative))
                return;

              emitter.emit(type, file);
            });
        })
        .nodeify(callback);
    }
  }

  statType(path) {
    return this.stat(path).then(stats => stats.type);
  }

  readdir(path) {
    throw new Error("not implemented");
  }

  stat(path) {
    throw new Error("not implemented");
  }

}
