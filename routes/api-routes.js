// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

var db = require("../models");
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

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
};
