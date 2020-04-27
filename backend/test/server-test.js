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
