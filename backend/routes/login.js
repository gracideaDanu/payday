const express = require('express');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const database = require("../data/database")


router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    console.log(email)

    var queryUser = `SELECT * FROM public."User" WHERE "Email" = '${email}';`
    console.log(queryUser)


    const { rows } = await database.query(queryUser);
    const dbResponse = rows[0];
    console.log(dbResponse)
    // database.query(queryUser, (err, res) => {
    //   if (err) {
    //     // return res.status(400).json({
    //     //   message: "User doesn't exist"
    //     // });
    //     console.log(err)
    //   }
    //   console.log(res.rows);
    //   // if (res.length === 0) {
    //   //   return res.status(400).json({
    //   //     message: "User doesn't exist."
    //   //   });
    //   // }

    //   console.log("Lese den ersten Eintrag aus dem Array")
    //   console.log(res.rows[0]);

    //   user = res.rows[0];
    //   console.log(res);
    // });

    // console.log(user)

    try {
      // if (!user)
      //   return res.status(400).json({
      //     message: "User doesn't exist."
      //   });

      const isMatch = await bcrypt.compare(password, dbResponse.Password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        email: this.email
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

module.exports = router;