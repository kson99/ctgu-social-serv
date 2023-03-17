const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post('/', (req, res) => {

    const follower = req.body.follower;
    const following = req.body.following;

    db.query("INSERT INTO Follows (follower, following) VALUES (?, ?)", [follower, following], (err, results) => {
        console.log(err);
        res.send(results);
    })
})

router.get('/followers', (req, res) => {

    const username = req.query.foo;

    db.query("SELECT * FROM Follows WHERE follower = ?", username, (err, results) => {
        console.log(err);
        res.send(results);
    })
})

router.get('/following', (req, res) => {

    const username = req.query.foo;

    db.query("SELECT * FROM Follows WHERE following = ?", username, (err, results) => {
        console.log(err);
        res.send(results);
    })
})

module.exports = router;