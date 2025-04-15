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
    res.render('organiser-dashboard', {
      title: 'Organiser Dashboard',
      user: req.session.user,
      isOrganiser: true,
      courses
    });
  });
});

// Add new course form
router.get('/organiser/courses/new', ensureOrganiser, (req, res) => {
  res.render('organiser-new-course', {
    title: 'Add New Course',
    user: req.session.user,
    isOrganiser: true
  });
});

// Handle new course POST
router.post('/organiser/courses/new', ensureOrganiser, (req, res) => {
  const { name, duration, description, location, price } = req.body;
  let schedule = [];

if (req.body.date && req.body.time) {
  const dates = Array.isArray(req.body.date) ? req.body.date : [req.body.date];
  const times = Array.isArray(req.body.time) ? req.body.time : [req.body.time];

  for (let i = 0; i < dates.length; i++) {
    if (dates[i] && times[i]) {
      schedule.push({ date: dates[i], time: times[i] });
    }
  }
}

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
    res.render('organiser-edit-course', {
      title: 'Edit Course',
      user: req.session.user,
      isOrganiser: true,
      course: {
        ...course,
        scheduleJSON: JSON.stringify(course.schedule || [])
      }
    });
  });
});

// Handle edit with improved schedule parsing and safe update
router.post('/organiser/courses/:id/edit', ensureOrganiser, (req, res) => {
  const { name, duration, description, location, price } = req.body;

  console.log("DEBUG BODY:", req.body);

  let schedule = [];

  if (req.body.date && req.body.time) {
    const dates = Array.isArray(req.body.date) ? req.body.date : [req.body.date];
    const times = Array.isArray(req.body.time) ? req.body.time : [req.body.time];

    for (let i = 0; i < dates.length; i++) {
      if (dates[i] && times[i]) {
        schedule.push({ date: dates[i], time: times[i] });
      }
    }
  }

  console.log("Parsed Schedule:", schedule);

  coursesDB.update(
    { _id: req.params.id },
    { $set: { name, duration, description, location, price, schedule } },
    { multi: false, upsert: false },
    (err, numReplaced) => {
      if (err) {
        console.error("Update error:", err);
      } else {
        console.log("Updated documents:", numReplaced);
      }

      coursesDB.find({}, (err, all) => {
        console.log("Current DB:", all);
      });

      res.redirect('/organiser/dashboard');
    }
  );
});

// View participants
router.get('/organiser/courses/:id/participants', ensureOrganiser, (req, res) => {
  coursesDB.findOne({ _id: req.params.id }, (err, course) => {
    if (err || !course) return res.status(404).send('Not found');
    res.render('organiser-participants', {
      title: 'Class Participants',
      user: req.session.user,
      isOrganiser: true,
      course
    });
  });
});

module.exports = router;
