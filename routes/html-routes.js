// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    // index route loads entries.html !!!!! MIGHT WANT TO CHANGE THIS TO EXERCISE.HTML
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/entries.html"));
    });

    // cms route loads journal.html
    app.get("/journal", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/journal.html"));
    });

    // entries route loads entries.html
    app.get("/entries", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/entries.html"));
    });

    // exercise route loads exercise.html
    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });

};