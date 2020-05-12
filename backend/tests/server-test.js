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
// console.error(initScript);
// const initScript = require("../data/init-db.sql");

chai.use(chaiHttp);

before(async () => {
  // var queryUser = initScript;
  var queryUser = `DELETE FROM public."ExpenseParticipants"; DELETE FROM public."GroupUsers"; DELETE FROM public."Expense"; DELETE FROM public."Category"; DELETE FROM public."Group"; DELETE FROM public."User";`;
  try {
    await database.query(queryUser);
  } catch (e) {
    console.error(e);
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

var sessionToken = null;

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
          sessionToken = res.body.token;
          done();
        });
    });
    it("should login user and return token", (done) => {
      chai
        .request(server)
        .post("/login/")
        .set("content-type", "application/json")
        .send({
          password: "Password",
          email: "niklas@test.com"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("token");
          sessionToken = res.body.token;
          done();
        });
    });
    it("shouldn't login user", (done) => {
      chai
        .request(server)
        .post("/login/")
        .set("content-type", "application/json")
        .send({
          email: "niklasasdas@test.com",
          password: "Password",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("shouldn't login user", (done) => {
      chai
        .request(server)
        .post("/login/")
        .set("content-type", "application/json")
        .send({
          email: "niklas@test.com",
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});

describe("API test", () => {
  var users = null;
  describe("GET users", () => {
    it("should return all users without his user (array with two users)", (done) => {
      chai
        .request(server)
        .get("/api/users")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("users");
          res.body.users.should.have.length(2);
          users = res.body.users;
          done();
        });
    });
  });

  describe("Post category", () => {
    it("should create a new category and return Status code 201", (done) => {
      chai
        .request(server)
        .post("/api/category")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Kegeln",
          image: "🎳",
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("should create a new category and return Status code 201", (done) => {
      chai
        .request(server)
        .post("/api/category")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Essen",
          image: "🍔",
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("shouldn't create a category and return status code 400", (done) => {
      chai
        .request(server)
        .post("/api/category")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Trinken",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  var categories = null;
  describe("GET categories", () => {
    it("should return all categories", (done) => {
      chai
        .request(server)
        .get("/api/categories")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("categories");
          res.body.categories.should.have.length(2);
          categories = res.body.categories;
          done();
        });
    });
  });


  describe("Post Group", () => {
    it("should create a new group with niklas, pascsal and max and return Status code 201", (done) => {
      chai
        .request(server)
        .post("/api/group")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Kegelgruppe",
          participants: [users[0].Id, users[1].Id],
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("should create a new group with niklas and pascsal and return Status code 201", (done) => {
      chai
        .request(server)
        .post("/api/group")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Trinkgruppe",
          participants: [users[0].Id],
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("should create a group with hisself and return status code 201", (done) => {
      chai
        .request(server)
        .post("/api/group")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Trinkgruppe2",
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  var group = null;
  describe("GET groups", () => {
    it("should return all groups from the logged in user", (done) => {
      chai
        .request(server)
        .get("/api/groups")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("groups");
          res.body.groups.should.have.length(3);
          group = res.body.groups[0];
          done();
        });
    });
  });

  describe("Post expense", () => {
    it("should post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Getränkekauf",
          costs: 12.99,
          categoryId: categories[0].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("should post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          costs: 20.99,
          categoryId: categories[1].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
    it("shouldn't post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          name: "Essen",
          costs: 20.99,
          categoryId: categories[1].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("shouldn't post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          category: categories[1].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("shouldn't post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          costs: 12.99,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it("shouldn't post a expense to certain group", (done) => {
      chai
        .request(server)
        .post("/api/expense")
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          costs: 12.99,
          categoryId: categories[1].Id,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  var expenses = null;
  describe("GET expenses", () => {
    it("should return all expenses from certain group", (done) => {
      chai
        .request(server)
        .get("/api/expenses/" + group.Id)
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("expenses");
          res.body.expenses.should.have.length(2);
          expenses = res.body.expenses;
          done();
        });
    });
  });

  describe("PUT expense", () => {
    it("should replace a expense", (done) => {
      chai
        .request(server)
        .put("/api/expense/" + expenses[0].Id)
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          costs: 18.99,
          categoryId: categories[1].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("shouldn't replace a expense", (done) => {
      chai
        .request(server)
        .put("/api/expense/" + expenses[0].Id)
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send({
          title: "Essen",
          costs: "18,99",
          categoryId: categories[1].Id,
          groupId: group.Id,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("DELETE expense", () => {
    it("should delete a certain expense", (done) => {
      chai
        .request(server)
        .delete("/api/expense/" + expenses[0].Id)
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("DELETE group", () => {
    it("should delete a certain group", (done) => {
      chai
        .request(server)
        .delete("/api/expense/" + group.Id)
        .set("content-type", "application/json")
        .set("authentication", "Bearer " + sessionToken)
        .send()
        .end((err, res) => {
          res.should.have.status(200);
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
