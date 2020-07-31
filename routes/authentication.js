'use strict';

const { Router } = require('express');
const authRouter = Router();

const User = require('../models/user');

const routeGuard = require('../middleware/route-guard');
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const bcryptSalt = 10;

authRouter.get('/sign-up', (req, res) => {
  res.render('authentication/sign-up');
});

authRouter.post(
  '/sign-up',
  passport.authenticate('sign-up', {
    successRedirect: '/authentication/private',
    failureRedirect: '/authentication/sign-up'
  })
);

authRouter.get('/sign-in', (req, res, next) => {
  res.render('authentication/sign-in');
});

authRouter.post(
  '/sign-in',
  passport.authenticate('sign-in', {
    successRedirect: '/',
    failureRedirect: '/authentication/sign-in'
  })
);

authRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

authRouter.get('/private', routeGuard, (req, res, next) => {
  res.render('authentication/private');
});

module.exports = authRouter;
