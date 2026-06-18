const express = require('express')
const oauth = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const session = require('express-session')
const googleOAuth = require('./google.oauth.controller')
require('dotenv').config()

oauth.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
)

oauth.use(passport.initialize())
oauth.use(passport.session())

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${req.protocol}://${req.get('host')}/login/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      done(null, profile)
    },
  ),
)

oauth.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

oauth.get(
  '/login/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleOAuth.generateUserJWT,
)

module.exports = oauth
