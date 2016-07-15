/* eslint-disable no-unused-expressions, no-underscore-dangle, func-names */
const expect = require('chai').expect;
// const sinon = require('sinon');
const Piece = require('../../dst/models/piece');

describe('Piece', () => {
  describe('constructor', () => {
    it('should create a piece object', () => {
      const p = new Piece('white');
      expect(p.color).to.be.equal('white');
    });
  });
});
