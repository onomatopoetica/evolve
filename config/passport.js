const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

passport.use(
  new LocalStrategy(
    { usernameField: "email"},
    (email, password, done) => {
      db.User.findOne({
        where: { email: email}
      }).then(dbUser => {
        if (!dbUser) {
          return done(null, false, { message: "Unknown email. Please try again."});
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, { message: "Incorrect pasword. Please try again."});
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;



// ********************More basic version that uses local authentification, in case we decide to scrap email auth later
// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     res.redirect('/users/' + req.user.username);
//   });