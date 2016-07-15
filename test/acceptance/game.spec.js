/* eslint-disable no-unused-expressions, no-underscore-dangle, max-len */

const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../dst/server');
const cp = require('child_process');

describe('games', () => {
  // beforeEach((done) => {
  //   const path = 'Users/localadmin/workspace/checkers/test/scripts';
  //   cp.execFile(`${path}/populate.sh`, { cwd: `${path}` }, () => {
  //     done();
  //   });
  // });

  describe('get /games', () => {
    it('should get all the games', (done) => {
      request(app)
      .get('/games')
      .end((err, rsp) => {
        expect(err).to.be.null;
        expect(rsp.status).to.equal(200);
        //expect(rsp.body.games).to.have.length(1);
        done();
      });
    });
  });
});
