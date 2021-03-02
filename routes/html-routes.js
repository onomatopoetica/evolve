// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {

    // Each of the below routes just handles the HTML page that the user gets sent to.

    app.get("/", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.sendFile(path.join(__dirname, "../public/entries.html"));
        }
        else {
            res.sendFile(path.join(__dirname, "../public/signup.html"));
        }
    });

    app.get("/login", (req, res) => {
        // If the user already has an account send them to the members page
        if (req.user) {
            res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/login.html"));
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/members", isAuthenticated, (req, res) => {
        res.sendFile(path.join(__dirname, "../public/members.html"));
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