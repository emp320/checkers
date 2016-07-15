/* eslint-disable no-unused-expressions, arrow-body-style, no-underscore-dangle, func-names */

const Game = require('../../dst/models/game');
const Player = require('../../dst/models/player');
const expect = require('chai').expect;

describe('Game', () => {
  describe('#movePiece', () => {
    it('should move a players piece', (done) => {
      const pArray = ['5788047ec3b48332423c35aa', '5788049a290c8a5842000c67'];
      const g = new Game({
        name: 'Curly vs. Moe',
        players: pArray,
      });
      const fromPos = { x: 2, y: 0 };
      const toPos = { x: 3, y: 1 };
      g.movePiece(fromPos, toPos);
      g.validate(err => {
        expect(err).to.be.undefined;
        expect(g.board[3][1].color).to.equal('white');
        expect(g.turn).to.equal('black');
        done();
      });
    });
  });
  describe('#jumpPiece', () => {
    it('should jump a players piece', (done) => {
      const pArray = ['5788047ec3b48332423c35aa', '5788049a290c8a5842000c67'];
      const g = new Game({
        name: 'Curly vs. Moe',
        players: pArray,
      });
      g.movePiece({ x: 2, y: 2 }, { x: 3, y: 3 });
      g.movePiece({ x: 5, y: 5 }, { x: 4, y: 4 });
      g.jumpPiece({ x: 3, y: 3 }, { x: 5, y: 5 });
      g.validate(err => {
        expect(err).to.be.undefined;
        expect(g.board[5][5].color).to.equal('white');
        expect(g.culledBlack).to.equal(11);
        done();
      });
    });
  });
//
  describe('constructor', () => {
    it('should create a game object', (done) => {
      const pArray = ['5788047ec3b48332423c35aa', '5788049a290c8a5842000c67'];
      const g = new Game({
        name: 'Joe vs. Bob',
        players: pArray,
      });
      g.validate(err => {
      //  console.log(err);
        expect(err).to.be.undefined;
        expect(g._id).to.be.ok;
        expect(g.dateCreated).to.be.ok;
        expect(g.board.length).to.equal(8);
        expect(g.board[0].length).to.equal(8);
        expect(g.board[6][5]).to.be.defined;
        expect(g.board[0][0].color).to.equal('white');
        expect(g.board[7][7].color).to.equal('black');
        expect(g.players.length).to.equal(2);
        expect(g.culledWhite).to.be.equal(12);
        done();
      });
    });
  });
  //
  // it('should not create a game object - duplicate match found', sinon.test(function (done) {
  //   this.stub(Game, 'find').yields(null, [{ name: 'eli vs. rich' }]);
  //   const d = new Game({ name: 'rich vs. max' });
  //   d.validate(err => {
  //       // console.log('err-name missing:', err);
  //     expect(err).to.be.ok;
  //     sinon.assert.calledWith(Game.find, { name: 'rich vs. max' });
  //     done();
  //   });
  // }));
});
