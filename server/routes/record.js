const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record").get(function(req, res) {
    let db_connection = dbo.getDb("employees");
    db_connection
        .collection("records")
        .find({})
        .toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/record/:id").get(function(req, res) {
    let db_connection = dbo.getDb();
    let myquery = {_id: ObjectId(req.params.id)};
    db_connection
        .collection("records")
        .findOne(myquery, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/record/add").post(function(req, res) {
    let db_connection = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connection
        .collection("records")
        .insertOne(myobj, function(err, result) {
            if (err) throw err;
            res.json(result);
        });
});

recordRoutes.route("/update/:id").post(function(req, res) {
    let db_connection = dbo.getDb();
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connection
        .collection("records")
        .updateOne(myquery, newvalues, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            res.json(result);
        });
});

recordRoutes.route("/:id").delete((req, res) => {
    let db_connection = dbo.getDb();
    let myquery = {
        _id: ObjectId(req.params.id)
    };
    db_connection
        .collection("records")
        .deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            res.json(obj);
        });
});

module.exports = recordRoutes;