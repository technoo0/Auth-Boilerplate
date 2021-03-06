var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { Op } = require("sequelize");
const User = require("../models/user");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({
        where: {
          [Op.and]: [{ id: profile.id }, { strategy: "google" }],
        },
      })
        .then((user) => {
          if (!user) {
            User.create({
              Name: profile.displayName,
              email: profile.emails[0].value,
              id: profile.id,
              strategy: "google",
            }).then((user) => {
              return cd(null, user);
            });
          } //the email not regestred

          return cd(null, user);
        })
        .catch((err) => {
          cd(err);
          console.log("rrrrrrrrrr");
        });
      console.log(profile);
      cb(null, profile);
    }
  )
);
