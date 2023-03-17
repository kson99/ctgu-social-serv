const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post('/', (req, res) => {

    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const message = req.body.message;

    db.query("INSERT INTO Messages (sender, receiver, message) VALUES (?, ?, ?)",
    [sender, receiver, message],
    (err, results) => {
        console.log(err);
        res.send(results);
    });
});

router.get('/', (req, res) => {

    const username = req.query.foo;
    const username1 = req.query.foo;

    db.query("SELECT * FROM Messages WHERE receiver = ? OR sender = ? ORDER BY id ASC",[username, username1] ,
    (err, results) => {
        console.log(err);
        res.send(results);
    })
});

module.exports = router;