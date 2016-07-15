/* eslint-disable no-unused-expressions, arrow-body-style,
  no-underscore-dangle, func-names, max-len, consistent-return */
  /* eslint-disable no-use-before-define */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Piece = require('../../dst/models/piece');
const w = new Piece('white');
const b = new Piece('black');
const boardStart = [
  [w, ' ', w, ' ', w, ' ', w, ' '],
  [' ', w, ' ', w, ' ', w, ' ', w],
  [w, ' ', w, ' ', w, ' ', w, ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', b, ' ', b, ' ', b, ' ', b],
  [b, ' ', b, ' ', b, ' ', b, ' '],
  [' ', b, ' ', b, ' ', b, ' ', b]];

const schema = new Schema({
  name: { type: String,
          required: true,
        //  validate: { validator: duplicateGameNameValidator },
        },
  players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
  dateCreated: { type: Date, default: Date.now },
  board: { type: Array, default: boardStart },
  culledWhite: { type: Number, default: 12 },
  culledBlack: { type: Number, default: 12 },
  turn: { type: String, default: 'white' },
});

schema.methods.movePiece = function (from, to, cb) {
  if (this.board[from.x][from.y] === ' ') return new Error('No piece to move!');
  if (this.board[to.x][to.y] !== ' ') return new Error('Invalid space occupied!');
  if (Math.abs(from.y - to.y) !== 1 || Math.abs(from.x - to.x) !== 1) return new Error('Invalid move, piece can move one at a time');
  if (this.board[from.x][from.y].color === 'w' && this.board[from.x][from.y].state !== 'kinged' && (to.y - from.y) === -1) return new Error('Invalid move, piece can not move backward');
  if (this.board[from.x][from.y].color === 'b' && this.board[from.x][from.y].state !== 'kinged' && (to.y - from.y) === 1) return new Error('Invalid move, piece can not move backward');
  if (this.board[from.x][from.y].color !== this.turn) return new Error(`Invalid move, It's ${this.turn} turn`);
  if (to.x <= 0 || to.y <= 0) return new Error('Invalid move, out of bounds');
  const piece = this.board[from.x][from.y];
  this.board[to.x][to.y] = piece;
  this.board[from.x][from.y] = ' ';
  this.turn = (this.turn === 'white') ? 'black' : 'white';
  this.save((err, game) => {
    cb(game);
  });
};

schema.methods.jumpPiece = function (from, to, cb) {
  if (this.board[from.x][from.y] === ' ') return new Error('No piece to move!');
  if (this.board[to.x][to.y] !== ' ') return new Error('Invalid space occupied!');
  if (Math.abs(from.y - to.y) !== 2 || Math.abs(from.x - to.x) !== 2) return new Error('Invalid move, piece can move one at a time');
  if (this.board[from.x][from.y].color === 'w' && this.board[from.x][from.y].state !== 'kinged' && (to.y - from.y) === -2) return new Error('Invalid move, piece can not move backward');
  if (this.board[from.x][from.y].color === 'b' && this.board[from.x][from.y].state !== 'kinged' && (to.y - from.y) === 2) return new Error('Invalid move, piece can not move backward');
  if (this.board[from.x][from.y].color !== this.turn) return new Error(`Invalid move, It's ${this.turn} turn`);
  if (to.x <= 0 || to.y <= 0) return new Error('Invalid move, out of bounds');
  const piece = this.board[from.x][from.y];
  this.board[(from.x + to.x) / 2][(from.y + to.y) / 2] = ' ';
  this.board[to.x][to.y] = piece;
  this.board[from.x][from.y] = ' ';
  if (piece.color === 'white') this.culledBlack--; else this.culledWhite--;
  this.turn = (this.turn === 'white') ? 'black' : 'white';
  this.save((err, game) => {
    cb(game);
  });
};

// function duplicateGameNameValidator(name, cb) {
//   this.model('Game').find({ name }, (err, games) => {
//     cb(!games.length);
//   });
// }

module.exports = mongoose.model('Game', schema);
