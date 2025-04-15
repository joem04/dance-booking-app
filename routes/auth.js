const express = require('express');
const router = express.Router();
const { db, createUser, authenticate } = require('../models/users');

router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register',
    user: req.session.user,
    isOrganiser: req.session.user?.role === 'organiser'
  });
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  createUser({ username, password, role: 'user' }, (err, newUser) => {
    if (err) return res.send('Registration error.');
    req.session.user = newUser;
    res.redirect('/courses');
  });
});

router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    user: req.session.user,
    isOrganiser: req.session.user?.role === 'organiser'
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  authenticate(username, password, (err, user) => {
    if (!user) return res.send('Login failed.');
    req.session.user = user;
    res.redirect('/courses');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
