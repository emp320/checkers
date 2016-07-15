/* eslint-disable new-cap */

import express from 'express';
import Player from '../models/player';
const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Player.find().exec((err, players) => {
    res.send({ players });
  });
});

router.post('/', (req, res) => {
  Player.create(res.locals, (err, player) => {
    res.send({ player });
  });
});
