const { response } = require('express');
const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.post('/', (req, res) => {

    const caption = req.body.caption;
    const image = req.body.image;
    const username = req.body.username;

    db.query("INSERT INTO Uploads (caption, image, username) VALUES (?, ?, ?)",
    [caption, image, username], 
    (err, results) => {
        console.log(err);
        // res.send(results);
        db.query("SELECT * FROM Users WHERE username = ?", username,
        (err2, results2) => {
            console.log.apply(err2);
            db.query("UPDATE Uploads SET profilePicture = ? WHERE username = ?", [results2[0].profilePicture, username],
            (err3, results3) => {
                console.log(err3);
                res.send(results3);
            })
        })
    });
});

router.get('/', (req, res) => {
    db.query("SELECT * FROM Uploads ORDER BY id DESC", (err, results) => {
        if (err) {
            console.log(err);
        }
        res.send(results);
    });
});

router.get('/byUser/:username', (req, res) => {

    const username = req.params.username;

    db.query("SELECT * FROM Uploads WHERE username = ?", username, (err, results) => {
        res.send(results);
    });

});

router.get('/:username', (req, res) => {

    const username = req.params.username;

    db.query("SELECT * FROM Uploads WHERE username = ?", username, (err, results) => {
        res.send(results);
    })
});

router.post('/like', (req, res) => {

    const userLiking = req.body.userLiking;
    const postId = req.body.postId;

    db.query("INSERT INTO Likes (userLiking, postId) VALUES (?, ?)", [userLiking, postId],
    (err, results) => {
        console.log(err);

        if (results !== undefined || results !== null){
            db.query("UPDATE Uploads SET likesNo = likesNo + 1 WHERE id = ?", postId ,
            (err2, results2) => {
                res.send(results2);
            });
        }
    });
});

router.post('/proPic', (req, res) => {
    const image = req.body.image;
    const username = req.body.username;

    db.query("UPDATE Users SET profilePicture = ? WHERE username = ?", [image, username],
    (err, results) => {
        console.log(err);
        db.query("UPDATE Uploads SET profilePicture = ? WHERE username = ?", [image, username],
        (err2, results2) => {
            console.log(err2);
            res.send(results2);
        })
    })
});

module.exports = router;