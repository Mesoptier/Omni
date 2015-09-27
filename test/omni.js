var chai = require('chai');
var expect = chai.expect;

import * as omni from '../lib/omni';
import Stats, { TYPE_FILE, TYPE_DIRECTORY } from '../lib/models/stats';

describe('omni', () => {

  it('exposes Local', () => {
    expect(omni).to.have.property('Local');
  });

  describe('Stats', () => {

    it('exposes properties: type, mime', () => {
      var stats = new Stats(TYPE_FILE, 'mime');
      expect(stats).to.have.property('type', TYPE_FILE);
      expect(stats).to.have.property('mime', 'mime');
    });

    describe('isFile', () => {

      it('with type: file', () => {
        expect(new Stats(TYPE_FILE, null).isFile).to.equal(true);
      });

      it('with type: directory', () => {
        expect(new Stats(TYPE_DIRECTORY, null).isFile).to.equal(false);
      });

    });

    describe('isDirectory', () => {

      it('with type: directory', () => {
        expect(new Stats(TYPE_DIRECTORY, null).isDirectory).to.equal(true);
      });

      it('with type: file', () => {
        expect(new Stats(TYPE_FILE, null).isDirectory).to.equal(false);
      });

    });

  });

});
