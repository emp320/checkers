/* eslint-disable no-unused-expressions, arrow-body-style, no-underscore-dangle, func-names */

const Game = require('../../dst/models/game');
const Player = require('../../dst/models/player');
const sinon = require('sinon');
const expect = require('chai').expect;

describe('Game', () => {
  // beforeEach(() => {
  //   sinon.stub(Board, 'find').yields(null, []);
  // });
  // afterEach(() => {
  //   sinon.find.restore();
  // });

  describe('#addPlayers', () => {
    it('should add two players to the game', (done) => {
      const g = new Game({
        name: 'Curly vs. Moe',
      });

      const p1 = new Player({
        name: 'moe howard',
        color: 'white',
      });
      p1.save();

      const p2 = new Player({
        name: 'curly joe',
        color: 'black',
      });
      g.addPlayers(p1._id, p2._id);
      g.validate(err => {
        expect(err).to.be.undefined;
        expect(g.player.length).to.be.equal(2);
        done();
      });
    });
  });

  // describe('#movePiece', () => {
  //   it('should move a players piece', (done) => {
  //     const g = new Game({
  //       name: 'Curly vs. Moe',
  //     });
  //     const from = { x: 0, y: 0 };
  //     const to = { x: 2, y: 0 };
  //     const pId = '423423423423423';
  //     g.movePiece(playerId, from, to);
  //     g.validate(err => {
  //       expect(err).to.be.undefined;
  //       //expect(g.player)
  //       done();
  //     });
  //   });
  // });
//
  describe('constructor', () => {
    it('should create a game object', (done) => {
      const g = new Game({
        name: 'Joe vs. Bob',
      });
      g.validate(err => {
        expect(err).to.be.undefined;
        expect(g._id).to.be.ok;
        expect(g.dateCreated).to.be.ok;
        expect(g.board.length).to.equal(8);
        expect(g.board[0].length).to.equal(8);
        expect(g.board[6][5]).to.be.defined;
        expect(g.board[0][0].color).to.equal('white');
        expect(g.board[7][7].color).to.equal('black');
        done();
      });
    });
  });
  //
  it('should not create a game object - duplicate match found', sinon.test(function (done) {
    this.stub(Game, 'find').yields(null, [{ name: 'eli vs. rich' }]);
    const d = new Game({ name: 'rich vs. max' });
    d.validate(err => {
        // console.log('err-name missing:', err);
      expect(err).to.be.ok;
      sinon.assert.calledWith(Game.find, { name: 'rich vs. max' });
      done();
    });
  }));
});
