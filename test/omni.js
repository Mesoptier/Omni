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

  });

});