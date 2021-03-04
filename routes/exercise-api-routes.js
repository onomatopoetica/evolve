var db = require("../models");

module.exports = function (app) {
    app.get("/api/exercise", function (req, res) {
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Exercise.findAll({
            include: [db.Post]
            // ??? Is this supposed to be Exercise or the name of the db evolve?
        }).then(function (dbExercise) {
            res.json(dbExercise);
        });
    });

    app.get("/api/exercise/:id", function (req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Post
        db.Exercise.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Post]
        }).then(function (dbExercise) {
            res.json(dbExercise);
        });
    });

    app.post("/api/exercise", function (req, res) {
        db.Exercise.create(req.body).then(function (dbExercise) {
            res.json(dbExercise);
        });
    });

    app.delete("/api/exercise/:id", function (req, res) {
        db.Exercise.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbExercise) {
            res.json(dbExercise);
        });
    });

};