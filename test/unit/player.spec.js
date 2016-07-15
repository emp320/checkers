/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
//const sinon = require('sinon');

//const cp = require('child_process');

describe('bookmarks', () => {
  // beforeEach((done) => {
  //   cp.execFile(`${__dirname}/../scripts/populate.sh`, { cwd: `${__dirname}/../scripts` }, () => {
  //     done();
  //   });
  // });

  describe('get /players', () => {
    it('should get all players', (done) => {
      request(app)
      .get('/players')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        done();
      });
    });
  });

  // create
  describe('post /players', () => {
    it('should create a player', (done) => {
      request(app)
      .post('/players')
      .send({
        name: 'Joseph Irons',
        color: 'white',
      })
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        //console.log('BODY', body);
        //expect(rsp.body.name).to.equal('Joseph Irons');
        done();
      });
    });
  });
});
