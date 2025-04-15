const express = require('express');
const router = express.Router();
const coursesDB = require('../models/courses');

// Middleware to restrict to organisers
function ensureOrganiser(req, res, next) {
  if (req.session.user && req.session.user.role === 'organiser') {
    return next();
  }
  return res.status(403).send('Access denied');
}

// Dashboard (list of courses with manage options)
router.get('/organiser/dashboard', ensureOrganiser, (req, res) => {
  coursesDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('DB error');
    res.render('organiser-dashboard', { user: req.session.user, courses });
  });
});

// Add new course form
router.get('/organiser/courses/new', ensureOrganiser, (req, res) => {
  res.render('organiser-new-course', { user: req.session.user });
});

// Handle new course POST
router.post('/organiser/courses/new', ensureOrganiser, (req, res) => {
  const { name, duration, description, location, price } = req.body;
  const schedule = []; // For now, we'll keep it empty
  const bookings = [];

  const newCourse = { name, duration, description, location, price, schedule, bookings };
  coursesDB.insert(newCourse, () => res.redirect('/organiser/dashboard'));
});

// Delete course
router.post('/organiser/courses/:id/delete', ensureOrganiser, (req, res) => {
  coursesDB.remove({ _id: req.params.id }, {}, () => {
    res.redirect('/organiser/dashboard');
  });
});

// Edit form
router.get('/organiser/courses/:id/edit', ensureOrganiser, (req, res) => {
  coursesDB.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.status(404).send('Not found');
    res.render('organiser-edit-course', { user: req.session.user, course });
  });
});

// Handle edit
router.post('/organiser/courses/:id/edit', ensureOrganiser, (req, res) => {
  const { name, duration, description, location, price } = req.body;

  coursesDB.update(
    { _id: req.params.id },
    { $set: { name, duration, description, location, price } },
    {},
    () => res.redirect('/organiser/dashboard')
  );
});

// View participants
router.get('/organiser/courses/:id/participants', ensureOrganiser, (req, res) => {
  coursesDB.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.status(404).send('Not found');
    res.render('organiser-participants', { user: req.session.user, course });
  });
});

module.exports = router;
