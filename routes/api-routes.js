// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

// mysql profile: host, port, user and password
require("dotenv").config();
let keys = require("../keys.js");

// local dev env
let mysql_database = keys.dev.database;
let mysql_username = keys.dev.username;
let mysql_password = keys.dev.password;
let mysql_host = keys.dev.host;
let mysql_port = keys.dev.port;


// Heroku env
if (process.env.JAWSDB_URL) {
   let str = process.env.JAWSDB_URL;
   let arr = str.split("/");
   let arr2 = arr[2].split(":");
   let arr3 = arr2[1].split("@");

    mysql_database = arr[3];
    mysql_username = arr2[0];
    mysql_password = arr3[0];
    mysql_host = arr3[1];
    mysql_port = arr2[2];
};

var sequelize = new Sequelize(mysql_database, mysql_username, mysql_password, {
    host: mysql_host,
    port: mysql_port,
    dialect: "mysql"
});

//Relations (foreign key constraint)
// -- need to have both hasOne and BelongsTo to avoid reference error
//    "ReferenceError: [model] is not defined"
db.role.hasOne(db.user, {
    foreignKey: {
        name: 'permission_id',
        allowNull: true,
    }
});

db.user.hasMany(db.result, {
    foreignKey: {
        name: 'user_id',
        allowNull: false
    }
});

db.quiz.hasMany(db.result, {
    foreignKey: {
        name: 'quiz_id',
        allowNull: false
    }
});

// Routes
// =============================================================
module.exports = function (app) {

    app.post("/api/testuser", function (req, res) {
        console.log(req.body);

        var isManager;

        if (req.body.email === "test1@test.com") {
            isManager = false;
        }

        if (req.body.email === "test2@test.com") {
            isManager = true;
        }

        var obj = {
            email: req.body.email,
            isManager: isManager
        }
        res.json(obj);
    });


    // ---- automentor api routes: user

    // GET route for select all 
    app.get("/api/users", function (req, res) {

        db.user
            .findAll().then(result => res.json(result));
    });

    // GET - select one
    app.get("/api/users/:id", function (req, res) {

        db.user
            .findOne({ where: { id: req.params.id } }).then(result => res.json(result));
    });


    // POST - insert
    app.post("/api/users", function (req, res) {

        db.user
            .create(req.body).then(results => res.json(results));

    });

    // PUT - update
    app.put("/api/users/:id", function (req, res) {
        db.user
            .update({ devoured: req.body.devoured }, { where: { id: req.params.id } }).then(results => res.json(results));
    });

    // DELETE delete 
    app.delete("/api/users/:id", function (req, res) {
        db.user
            .destroy({ where: { id: req.params.id } }).then(results => res.json(results));
    });

    // ---- automentor api routes: quiz

    // GET route for select all 
    app.get("/api/quizzes", function (req, res) {

        db.quiz
            .findAll().then(result => res.json(result));
    });

    // GET - select one
    app.get("/api/quizzes/:id", function (req, res) {

        db.quiz
            .findOne({ where: { id: req.params.id } }).then(result => res.json(result));
    });


    // POST - insert
    app.post("/api/quizzes", function (req, res) {

        db.quiz
            .create(req.body).then(results => res.json(results));

    });

    // PUT - update
    app.put("/api/quizzes/:id", function (req, res) {
        db.quiz
            .update({ devoured: req.body.devoured }, { where: { id: req.params.id } }).then(results => res.json(results));
    });

    // DELETE delete 
    app.delete("/api/quizzes/:id", function (req, res) {
        db.quiz
            .destroy({ where: { id: req.params.id } }).then(results => res.json(results));
    });

    // ---- automentor api routes: resutls

    // GET route for select all 
    app.get("/api/results", function (req, res) {

        db.result
            .findAll().then(result => res.json(result));
    });

    // GET - select one user's result

    app.get("/api/results/:userid", function (req, res) {

        db.result
            .findAll({ where: { user_id: req.params.userid } }).then(result => res.json(result));
    });


    app.get("/api/results/:userid/:quizid", function (req, res) {

        let whereStatement = {};
        whereStatement.user_id = req.params.userid;
        whereStatement.id = req.params.quizid;

        // Example of where clause
        db.result
            .findAll({ where: whereStatement }).then(result => res.json(result));
    });

    app.get("/api/resultsbydate/:date", function (req, res) {

        // not done yet
        // Example of less than
        db.result
            .findAll({ where: { id: { [Op.lt]: 4 } } }).then(result => res.json(result));
    });

    app.get("/api/resultsbydate/:date/:userid", function (req, res) {

        let whereStatement = {};
        whereStatement.user_id = req.params.userid;

        // not done yet
        db.result
            .findAll({ where: whereStatement }).then(result => res.json(result));
    });

    app.get("/api/resultsbyusername/:username", function (req, res) {

        let whereStatement = {};
        whereStatement.username = req.params.username;

        // Example of Join Statement
        // SELECT * FROM users JOIN results ON (users.id = results.user_id) where users.username = 'jim';
        // required=true means inner join
        // required=false means left outer join
        db.user
            .findAll({
                where: whereStatement,
                include: [{
                    model: db.result,
                    required: true
                }]
            }).then(result => res.json(result));
    });


    // POST - insert
    app.post("/api/results", function (req, res) {

        db.result
            .create(req.body).then(results => res.json(results));

    });

    // PUT - update
    app.put("/api/results/:id", function (req, res) {
        db.result
            .update({ devoured: req.body.devoured }, { where: { id: req.params.id } }).then(results => res.json(results));
    });

    // DELETE delete 
    app.delete("/api/results/:id", function (req, res) {
        db.result
            .destroy({ where: { id: req.params.id } }).then(results => res.json(results));
    });

    // ---- automentor api routes: Charts

    // are my get(names) causing a problem?

    // Function to collect data for FIRST Graph
    function getData(callback) {

        sequelize.query("SELECT users.first_name, SUM(results.score) FROM results JOIN users ON results.user_id = users.id GROUP BY users.first_name").spread((results1, metadata) => {
            // Results will be resulting array and metadata will contain the number of affected rows.
            console.log("data1 from database");
            console.log(results1);
            return callback(results1);
        })
    }

    // Sends Individual Scores to html file
    app.get("/api/userscore", function (req, res) {
        getData(function (rows1) {
            console.log("data1 to be sent");
            console.log(rows1);
            res.json(rows1);
        });
    });

    // Function to collect data for SECOND Graph
    function getData2(callback) {

        sequelize.query("SELECT quizzes.id, SUM(results.score) FROM results JOIN quizzes ON results.quiz_id = quizzes.id GROUP BY quizzes.id").spread((results2, metadata) => {
            // Results will be resulting array and metadata will contain the number of affected rows.
            console.log("data1 from database");
            console.log(results2);
            return callback(results2);
        })
    }

    // Sends Test Values to html file
    app.get("/api/quizscore", function (req, res) {
        getData2(function (rows2) {
            console.log("data1 to be sent");
            console.log(rows2);
            res.json(rows2);
        });
    });


};
