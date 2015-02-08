var mpath = require("path");
var mime = require("mime-types");
var Promise = require("bluebird");
var fs = require("fs");

Promise.promisifyAll(fs);

import {Base} from "./base";
import {Stats} from "../models";

export class Local extends Base {

  constructor(root) {
    super();

    this.root = root;
  }

  readdir(path) {
    var fullPath = this._getFullPath(path);

    return fs.readdirAsync(fullPath)
      .map((name) => mpath.posix.join(path, name));
  }

  stat(path) {
    var fullPath = this._getFullPath(path);

    return fs.statAsync(fullPath)
      .then((stats) => new Stats(
        Local._getTypeFromStats(stats),
        mime.lookup(path)
      ));
  }

  _getFullPath(path) {
    return mpath.join(this.root, path);
  }

  static _getTypeFromStats(stats) {
    if (stats.isFile()) return "file";
    if (stats.isDirectory()) return "directory";
    throw new Error("Only file and directory types are supported");
  }

}