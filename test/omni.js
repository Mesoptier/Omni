var chai = require("chai");
var expect = chai.expect;

import * as omni from "../lib/omni";
import {File, Stats} from "../lib/models";

describe("omni", () => {

  it("exposes Local", () => {
    expect(omni).to.have.property("Local");
  });

  describe("Stats", () => {

    it("exposes properties: type, mime", () => {
      var stats = new Stats("type", "mime");
      expect(stats).to.have.property("type", "type");
      expect(stats).to.have.property("mime", "mime");
    });

    describe("isFile", () => {

      it("with type: file", () => {
        expect(new Stats("file", null).isFile).to.equal(true);
      });

      it("with type: directory", () => {
        expect(new Stats("directory", null).isFile).to.equal(false);
      });

    });

    describe("isDirectory", () => {

      it("with type: directory", () => {
        expect(new Stats("directory", null).isDirectory).to.equal(true);
      });

      it("with type: file", () => {
        expect(new Stats("file", null).isDirectory).to.equal(false);
      });

    });

  });

  describe("File", () => {

    it("exposes properties: path", () => {
      var file = new File("/path/to/file.txt");
      expect(file).to.have.property("path", "/path/to/file.txt");
    });

    describe("#dirname", () => {

      it("works with path", () => {
        expect(new File("/path/to/file.txt")).to.have.property("dirname", "/path/to");
      });

      it("works without path", () => {
        expect(new File("/file.txt")).to.have.property("dirname", "/");
      });

    });

    describe("#basename", () => {

      it("works with path", () => {
        expect(new File("/path/to/file.txt")).to.have.property("basename", "file.txt");
      });

      it("works without path", () => {
        expect(new File("/file.txt")).to.have.property("basename", "file.txt");
      });

    });

    describe("#extname", () => {

      it("works with extension", () => {
        expect(new File("/path/to/file.txt")).to.have.property("extname", ".txt");
      });

      it("works without extension", () => {
        expect(new File("/path/to/file")).to.have.property("extname", "");
      });

      it("works with multiple '.' in filename", () => {
        expect(new File("/www.shh.com.org")).to.have.property("extname", ".org");
      });

      it("works with '.' in dirname", () => {
        expect(new File("/path.something/file")).to.have.property("extname", "");
      });

    });

  });

});