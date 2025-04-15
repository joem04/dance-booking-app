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

module.exports = router;
