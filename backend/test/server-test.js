const server = require("../index.js");
const chai = require("chai");
const expect = require("chai").expect;
const should = chai.should();
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Test", () => {
  describe("GET /", () => {
    it("should GET a message that the server is wokring", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message").eql("Server is running.");
          done();
        });
    });
  });
});

// describe('useless api endpoint', function () {
//   var token;
//   before(function (done) {
//     request.post(‘/auth/local’)
//       .send({
//         email: ‘test@user.com’,
//     password: ‘password’
//   })
//     .end(function (err, res) {
//       if (err) throw err;
//       token = { access_token: res.body.token }
//       done();
//     });
// });

// it('posts an object', function (done) {
//   request.post('/api/useless')
//     .send({ property: value })
//     .query(token)
//     .expect(201)
//     .end(function (err, res) {
//       should(err).equal(null);
//       done()
//     });
// });
// });



// describe("Authentication"() => {
//   describe("SignUp", () => {
//     it("should Sign Up a user", (done => {
//       chai.request(server)
//         .post("/singup")
//         .end((err, res) => {
//           res.should.have.status(200);
//           done();
//         });
//     });
//   });
// });
