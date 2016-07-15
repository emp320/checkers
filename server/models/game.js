/* eslint-disable no-unused-expressions, arrow-body-style,
  no-underscore-dangle, func-names */
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
          validate: { validator: duplicateGameNameValidator }
        },
  players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
  dateCreated: { type: Date, default: Date.now },
  board: { type: Array, default: boardStart },
});

schema.methods.addPlayers = function (p1Id, p2Id) {
  return;
}

// schema.methods.movePiece = function (from, to, cb) {
//   if ()
//   this.save((err, game) => {
//     cb(game);
//   });
// };

function duplicateGameNameValidator(name, cb) {
  this.model('Game').find({ name }, (err, games) => {
    cb(!games.length);
  });
}

module.exports = mongoose.model('Game', schema);
