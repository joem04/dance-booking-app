// models/courses.js
const Datastore = require('nedb');
const path = require('path');

const db = new Datastore({ 
  filename: path.join(__dirname, '../db/courses.db'), 
  autoload: true 
});

// Insert dummy data if DB is empty
db.count({}, (err, count) => {
  if (count === 0) {
    const sampleCourses = [
      {
        name: 'Beginner Salsa',
        duration: '6 weeks',
        description: 'Fun and energetic salsa classes for beginners.',
        location: 'Main Hall A',
        price: '£40',
        schedule: [
          { date: '2025-04-20', time: '18:00' },
          { date: '2025-04-27', time: '18:00' }
        ]
      },
      {
        name: 'Weekend Bachata Workshop',
        duration: '2 days',
        description: 'An intensive workshop over the weekend.',
        location: 'Studio B',
        price: '£25',
        schedule: [
          { date: '2025-05-03', time: '12:00' },
          { date: '2025-05-04', time: '12:00' }
        ]
      }
    ];
    db.insert(sampleCourses, (err, newDocs) => {
      if (err) console.error(err);
      else console.log('Sample courses added to DB.');
    });
  }
});

module.exports = db;
