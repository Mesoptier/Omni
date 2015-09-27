export default class Stats { 

  constructor(type, mime) {
    this.type = type;
    this.mime = mime;
  }

  get isFile() {
    return this.type == TYPE_FILE;
  }

  get isDirectory() {
    return this.type == TYPE_DIRECTORY;
  }
  
}

export const TYPE_FILE = 'file';
export const TYPE_DIRECTORY = 'directory';
