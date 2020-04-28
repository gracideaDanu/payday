const express = require ('express');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('../models/user');

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
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User already exists"
                })
            }
            user = new User({
                username,
                name,
                surname,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            
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