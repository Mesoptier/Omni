var mpath = require("path");

export class File {
  
  constructor(path) {
    this.path = path;
  }

  static join(dirname, basename) {
    var path = mpath.join(dirname, basename).replace(/\\/g, "/");
    return new File(path);
  }

  get dirname() {
    return mpath.dirname(this.path);
  }

  get basename() {
    return mpath.basename(this.path);
  }

  get extname() {
    return mpath.extname(this.path);
  }

  relative(from) {
    return mpath.relative(from, this.path).replace(/\\/g, "/");
  }

  toString() {
    return `[File] ${this.path}`;
  }

}