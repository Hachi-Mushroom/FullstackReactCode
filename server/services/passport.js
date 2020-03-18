const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// user to id, return id
// serializeUser determines which data of the user object should be stored in the session. 
// eg: req.session.passport.user = {id: 'xyz'}
passport.serializeUser((user, done) => {
  console.log(user) // user gives all user objects in DB, and user.id is not google.id, it is created automatically when new user is saved in DB
  done(null, user.id);
});

// id to user, return user
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true // tell google if the request is from any proxy(eg heroku), its fine, please trust it and do not change https to http
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      // const user = await new User({ googleId: profile.id }).save();
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);
