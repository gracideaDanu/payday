const server = require("../index.js");
const chai = require("chai");
const expect = require("chai").expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const database = require("../data/db-connection");

// var fs = require("fs"),
//   path = require("path"),
//   file = path.join("./data", "init-db.sql");

// const initScript = fs.readFileSync(file, "utf8");
// console.log(initScript);
// const initScript = require("../data/init-db.sql");

chai.use(chaiHttp);

before(async () => {
  // var queryUser = initScript;
  var queryUser = `DELETE FROM public."User"; DELETE FROM public."Category";`;
  console.log(queryUser);
  try {
    await database.query(queryUser);
  } catch (e) {
    console.log(e);
  }
});

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

describe("Authentication test", () => {
  describe("Post signup", () => {
    it("should signup user niklas and return token", (done) => {
      chai
        .request(server)
        .post("/signup/")
        .set("content-type", "application/json")
        .send({
          username: "niklas",
          name: "Niklas",
          surname: "Schildhauer",
          email: "niklas@test.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
    it("should signup user pascal and return token", (done) => {
      chai
        .request(server)
        .post("/signup/")
        .set("content-type", "application/json")
        .send({
          username: "pascal",
          name: "Pascal",
          surname: "Bursztyn",
          email: "pascal@test.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
    it("should signup user max and return token", (done) => {
      chai
        .request(server)
        .post("/signup/")
        .set("content-type", "application/json")
        .send({
          username: "max",
          name: "Max",
          surname: "Mustermann",
          email: "max@icloud.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
    it("shouldn't signup user niklas, because the mail already exists and return a message", (done) => {
      chai
        .request(server)
        .post("/signup/")
        .set("content-type", "application/json")
        .send({
          username: "niklas",
          name: "Niklas",
          surname: "Schildhauer",
          email: "niklas@test.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          done();
        });
    });
    it("shouldn't signup user niklas, because the password is too short and return a message", (done) => {
      chai
        .request(server)
        .post("/signup/")
        .set("content-type", "application/json")
        .send({
          username: "niklas",
          name: "Niklas",
          surname: "Schildhauer",
          email: "niklas@icloud.com",
          password: "Pas",
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message");
          done();
        });
    });
  });
  describe("Post login", () => {
    it("should login user and return token", (done) => {
      chai
        .request(server)
        .post("/login/")
        .set("content-type", "application/json")
        .send({
          email: "niklas@test.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          done();
        });
    });
  });
});

// describe("API test", () => {
//   describe("Post signup", () => {
//     it("should signup user and return token", (done) => {
//       chai
//         .request(server)
//         .post("/signup/")
//         .set("content-type", "application/json")
//         .send({
//           username: "niklas",
//           name: "Niklas",
//           surname: "Schildhauer",
//           email: "niklas@icloud.com",
//           password: "Password",
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("token");
//           done();
//         });
//     });
//   });
//   describe("Post login", () => {
//     it("should login user and return token", (done) => {
//       chai
//         .request(server)
//         .post("/login/")
//         .set("content-type", "application/json")
//         .send({
//           email: "niklas@icloud.com",
//           password: "Password",
//         })
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("token");
//           done();
//         });
//     });
//   });
// });

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
