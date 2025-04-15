const express = require('express');
const router = express.Router();
const { db, createUser, authenticate } = require('../models/users');

// GET Register
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register',
    user: req.session.user,
    isOrganiser: req.session.user?.role === 'organiser'
  });
});

// POST Register with duplicate check
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  db.findOne({ username }, (err, existingUser) => {
    if (err) return res.status(500).send('Database error.');
    if (existingUser) {
      return res.render('register', {
        title: 'Register',
        error: 'Username already taken. Please choose another.',
        user: req.session.user,
        isOrganiser: req.session.user?.role === 'organiser'
      });
    }

    createUser({ username, password, role: 'user' }, (err, newUser) => {
      if (err) return res.send('Registration error.');
      req.session.user = newUser;
      res.redirect('/courses');
    });
  });
});

// GET Login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    user: req.session.user,
    isOrganiser: req.session.user?.role === 'organiser'
  });
});

// POST Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    authenticate(username, password, (err, user) => {
      if (err) {
        return res.render('login', {
          title: 'Login',
          error: 'An error occurred during login.',
          user: req.session.user,
          isOrganiser: req.session.user?.role === 'organiser'
        });
      }
  
      if (!user) {
        return res.render('login', {
          title: 'Login',
          error: 'Incorrect username or password.',
          user: req.session.user,
          isOrganiser: req.session.user?.role === 'organiser'
        });
      }
  
      req.session.user = user;
      res.redirect('/courses');
    });
  });
  

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
