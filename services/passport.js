const passport = require('passport');
const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook');

const User = mongoose.model('users');

const keys = require('../config/keys');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then( user => {
        done(null, user);
    });
});

passport.use(
    new FacebookStrategy({
        clientID: keys.fb_app_id,
        clientSecret: keys.fb_app_secret,
        callbackURL: '/auth/facebook/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        
        const existingUser = await User.findOne({facebook_id: profile.id});
        if(existingUser){
            return done(null, existingUser);
        }

        const newUser = await new User({facebook_id: profile.id}).save()
        done(null, newUser);
    })
);
