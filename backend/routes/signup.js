const express = require('express');
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const database = require("../data/database")
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.json({ message: "LOGIN WORKING" });
});


router.post(
    '/',
    [
        //error handling if check failed 
        check("username", "Please enter a valid username")
            .not()
            .isEmpty(),
        check("name", "Please enter a valid first name")
            .not()
            .isEmpty(),
        check("surname", "Please enter a valid family name")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                // define !
                errors: errors.array()
            });
        }
        const {
            username,
            name,
            surname,
            email,
            password
        } = req.body;
        try {
            //reqeust if email ist already in use 
            // let user = await User.findOne({
            //     email
            // });
            // if (user) {
            //     return res.status(400).json({
            //         msg: "User already exists"
            //     })
            // }

            const salt = await bcrypt.genSalt(10);
            const passwordEncrypted = await bcrypt.hash(password, salt);

            var queryString = `INSERT INTO public."User"(
                "Username", "FirstName", "LastName", "Email", "Password"
                ) VALUES(
                '${username}', '${name}', '${surname}', '${email}', '${passwordEncrypted}'
                )`;

            database.query(queryString, (err, res) => {
                if (err) throw err;
            });

            const payload = {
                email: this.email
            }

            jwt.sign(
                payload,
                "token",
                {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);



module.exports = router;