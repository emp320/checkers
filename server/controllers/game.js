/* eslint-disable new-cap, no-underscore-dangle */

import express from 'express';
import Game from '../models/game';
import bodyValidator from '../validators/body';
// import queryValidator from '../validators/bookmarks/query';
import paramsValidator from '../validators/params';

const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Game.find().exec((err, players) => {
    res.send({ players });
  });
});

router.post('/', bodyValidator, (req, res) => {
  const players = [res.locals.player1._id, res.locals.player2._id];
  const matchName = res.locals.name;
  Game.create((matchName, players), (err, game) => {
    res.send({ game });
  });
});

router.post('/:id/move', paramsValidator, (req, res) => {
  Game.findById((res.params.id), (err, game) => {
    const isMoved = game.movePiece(res.locals.from, res.locals.to);
    if (isMoved !== Error) {
      game.save(() => {
        res.send({ game });
      });
    }
  });
});

router.post('/:id/jump', paramsValidator, (req, res) => {
  Game.findById((res.params.id), (err, game) => {
    const isMoved = game.movePiece(res.locals.from, res.locals.to);
    if (isMoved !== Error) {
      game.save(() => {
        res.send({ game });
      });
    }
  });
});
