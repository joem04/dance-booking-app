// routes/public.js
const express = require('express');
const router = express.Router();
const coursesDB = require('../models/courses');

router.get('/courses', (req, res) => {
  coursesDB.find({}, (err, courses) => {
    if (err) return res.status(500).send('Database error');
    res.render('courses', { courses });
  });
});

router.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;

  coursesDB.findOne({ _id: courseId }, (err, course) => {
    if (err || !course) {
      return res.status(404).send('Course not found');
    }

    res.render('course-detail', { course });
  });
});


module.exports = router;
