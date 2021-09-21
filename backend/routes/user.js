const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then( (users) => { res.status(200).json(users)})
})

router.route('/login').post((req, res) => {
    User.findOne({
        username: req.body.username
    })
    .then(async (user) => {
        try{
            if(await bcrypt.compare(req.body.password, user.password)) {
                res.status(200).json(user._id);
            }
            else {
                res.status(400).json('Incorrect credentials!');
            }
        }
        catch{
            res.status(500).json("Something went wrong!")
        }
    })
})

router.route('/register').post( async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword
        })

        newUser.save()
            .then(() => { 
                res.status(200).json('User created successfully.');
            })
            .catch((err) => {
                res.status(400).json('Error' + err);
            })
    }
    catch{
        res.status(500).send("Error creating user!");
    }
})

module.exports = router;