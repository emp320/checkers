/* eslint-disable no-unused-expressions, arrow-body-style, no-underscore-dangle, func-names */


import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String,
          required: true,
          minlength: 3,
        },
  isTurn: { type: Boolean,
            default: false,
          },
  color: { type: String, enum: ['white', 'black'] },
  // pieces: { type: [ pieces ] },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', schema);
