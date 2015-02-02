var chai = require("chai");
chai.use(require("chai-spies"));
chai.use(require("chai-things"));
chai.use(require("chai-as-promised"));
var expect = chai.expect;
var mock = require("mock-fs");
var {EventEmitter2} = require("eventemitter2");

import {Local} from "../lib/omni";
import {File, Stats} from "../lib/models";

describe("omni.Local", () => {
  var vfs;

  beforeEach(() => {
    mock({
      "mock": {
        "file.txt": "",
        "directory": {
          "file2.txt": "",
          "directory2": {}
        }
      }
    });

    vfs = new Local("mock");
  });

  afterEach(() => {
    mock.restore()
  });

  describe("#readdir", () => {

    it("lists the nodes in a directory", () => {
      return vfs.readdir("/")
        .then(nodes => {
          expect(nodes).to.have.length(2)
            .and.to.all.be.instanceOf(File)
        });
    });

    it("throws an error when the directory doesn't exist", () => {
      return expect(vfs.readdir("/non/existent/directory"))
        .to.be.rejectedWith("no such file or directory");
    });

  });

  describe("#stat", () => {

    it("returns Stats object", () => {
      return expect(vfs.stat("/file.txt"))
        .to.eventually.be.instanceOf(Stats);
    });

    it("has correct type for files", () => {
      return expect(vfs.stat("/file.txt"))
        .to.eventually.have.property("type", "file");
    });

    it("has correct type for directories", () => {
      return expect(vfs.stat("/directory"))
        .to.eventually.have.property("type", "directory");
    });

    it("throws an error when the file does not exist", () => {
      return expect(vfs.stat("/non/existent/directory"))
        .to.be.rejectedWith("no such file or directory");
    });

  });

  describe("#statType", () => {

    it("returns correct type for a file", () => {
      return expect(vfs.statType("/file.txt"))
        .to.eventually.equal("file");
    });

    it("returns correct type for a directory", () => {
      return expect(vfs.statType("/directory"))
        .to.eventually.equal("directory");
    });

    it("throws an error when the file does not exist", () => {
      return expect(vfs.statType("/non/existent/directory"))
        .to.be.rejectedWith("no such file or directory");
    });

  });

  describe("#walk", () => {

    it("returns an EventEmitter2 instance", () => {
      expect(vfs.walk("/")).to.exist
        .and.to.be.instanceOf(EventEmitter2);
    });

    it("emits 'file' event for files", (done) => {
      var spy = chai.spy((file) => {
        expect(file).to.be.instanceOf(File);
        expect(["/file.txt", "/directory/file2.txt"]).to.include(file.path);
      });

      vfs.walk("/")
        .on("file", spy)
        .on("end", () => {
          expect(spy).to.have.been.called.exactly(2);
          done();
        });
    });

    it("emits 'directory' event for directories", (done) => {
      var spy = chai.spy((file) => {
        expect(file).to.be.instanceOf(File);
        expect(["/directory", "/directory/directory2"]).to.include(file.path);
      });

      vfs.walk("/")
        .on("directory", spy)
        .on("end", () => {
          expect(spy).to.have.been.called.exactly(2);
          done();
        });
    });

    // TODO: Test 'end' event
    // TODO: Test 'error' event

  });

});