import mpath from 'path';
import mime from 'mime-types';
import Promise from 'bluebird';
import fs from 'fs';

import Base from './base';
import Stats, { TYPE_FILE, TYPE_DIRECTORY } from '../models/stats';

Promise.promisifyAll(fs);

export default class Local extends Base {

  constructor(root) {
    super();

    this.root = root;
  }

  readdir(path) {
    let fullPath = this._getFullPath(path);

    return fs.readdirAsync(fullPath)
      .map((name) => mpath.posix.join(path, name));
  }

  stat(path) {
    let fullPath = this._getFullPath(path);

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
    if (stats.isFile()) return TYPE_FILE;
    if (stats.isDirectory()) return TYPE_DIRECTORY;
    throw new Error('Only file and directory types are supported');
  }

}
