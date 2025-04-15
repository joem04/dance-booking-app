// routes/public.js
const express = require('express');
const router = express.Router();
const coursesDB = require('../models/courses');

// View all courses
router.get('/courses', (req, res) => {
  coursesDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Database error');
    res.render('courses', {
      courses,
      user: req.session.user
    });
  });
});

// View a single course detail
router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const currentUser = req.session.user;

  coursesDB.findOne({ _id: courseId }, (err, course) => {
    if (err || !course) return res.status(404).send('Course not found');

    const isEnrolled = currentUser && course.bookings && course.bookings.includes(currentUser.username);

    res.render('course-detail', {
      course,
      user: currentUser,
      isEnrolled
    });
  });
});

// Enroll in a course
router.post('/courses/:id/enroll', (req, res) => {
  const courseId = req.params.id;

  if (!req.session.user) {
    return res.redirect('/login');
  }

  const username = req.session.user.username;

  coursesDB.findOne({ _id: courseId }, (err, course) => {
    if (err || !course) return res.status(404).send('Course not found');

    const alreadyEnrolled = course.bookings && course.bookings.includes(username);
    if (alreadyEnrolled) {
      return res.redirect(`/courses/${courseId}`);
    }

    const updatedBookings = (course.bookings || []).concat(username);

    coursesDB.update(
      { _id: courseId },
      { $set: { bookings: updatedBookings } },
      {},
      () => res.redirect(`/courses/${courseId}`)
    );
  });
});

module.exports = router;
