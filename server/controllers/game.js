/* eslint-disable new-cap */

import express from 'express';
import Game from '../models/game';
import Player from '../models/player';
const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Player.find().exec((err, players) => {
    res.send({ players });
  });
});

router.post('/', (req, res) => {
  Player.create(res.locals, (err, game) => {
    res.send({ game });
  });
});
