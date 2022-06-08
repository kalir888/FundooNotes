import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
import res from 'express/lib/response';

let authToken;
let noteId;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }
    done();
  });
  describe('POST /registration', () => {
    it('given new user when added should return status 201', (done) => {
      const userDetails = {
        firstName: "Kalimuthu",
        lastName: "Ramachandran",
        email: "kalir888@gmail.com",
        password: "K@lir888"
      };
      request(app)
        .post('/api/v1/users/signup')
        .send(userDetails)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });
    });
    it('given new user if gave invalid details should return status 400', (done) => {
      const userDetails = {
        firstName: "Ka",
        lastName: "Ramachandran",
        email: "kalir888@gmail.com",
        password: "K@lir888"
      };
      request(app).post('/api/v1/users/signup').send(userDetails).end((err, res) => {
        expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
      done();
      });
    });
  });
  describe('POST /login', () => {
    it('given user when credentials match should return status 200', (done) => {
      const userDetails = {
        email: "kalir888@gmail.com",
        password: "K@lir888"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          authToken = res.body.data;
          console.log('authToken : ', authToken);
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });
    it('given user when credentials not match should return status 400', (done) => {
      const userDetails = {
        email: "kalir888@gmail.com",
        password: "K@lir88"
      };
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
  });
  describe('POST /forgotpassword', () => {
    it('given user when credentials find should return status 200', (done) => {
      const userDetails = {
        email: "kalir888@gmail.com"
      };
      request(app)
        .post('/api/v1/users/forgotpassword')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });
    it('given user when credentials not find should return status 400', (done) => {
      const userDetails = {
        email: "kalir88@gmail.com",
      };
      request(app)
        .post('/api/v1/users/forgotpassword')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
  });
  describe('POST /reset', () => {
    it('given user when password updated should return status 202', (done) => {
      const userDetails = {
        password: "Kali@1998"
      };
      request(app)
        .post('/api/v1/users/reset')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });
  });
  describe('POST /createNote', () => {
    it('given note when valid should return status 201', (done) => {
      const note = {
        Title: "NodeJs",
        Description: "it is a runtime environment for javascript"
      };
      request(app)
        .post('/api/v1/notes')
        .send(note)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
        done();
      });
    });
    it('given note when not valid should return status 400', (done) => {
      const note = {
        title: "NodeJs"
      };
      request(app)
        .post('/api/v1/notes')
        .send(note)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
  });
  describe('GET /getNote', () => {
    it('given noteId when found should return status 200', (done) => {
      request(app)
        .get(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });
    it('given noteId when not found should return status 400', (done) => {
      request(app)
        .get(`/api/v1/notes/5df544sdfsd45s`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
        done();
      });
    });
  });
  describe('PUT /updateNote', () => {
    it('given notedetails when updated should return status 202', (done) => {
      const updateNote = {
        Title: "ExpressJS",
        Description: "it's a open network framework to create a REST api"
      };
      request(app)
        .put(`/api/v1/notes/${noteId}`)
        .send(updateNote)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
        done();
      });
    });
  });
  describe('PUT /archiveNote', () => {
    it('given note when deleted should return status 202', (done) => {
      request(app)
        .put(`/api/v1/notes/isArchived/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
        done();
      });
    });
  });
  describe('PUT /trashNote', () => {
    it('given note when moved to trash should return status 202', (done) => {
      request(app)
        .put(`/api/v1/notes/isDeleted/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
        done();
      });
    });
  });
  describe('DELETE /deleteNote', () => {
    it('given notedetails when deleted should return status 200', (done) => {
      request(app)
        .delete(`/api/v1/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
        done();
      });
    });
  });
});