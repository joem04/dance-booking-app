const express = require('express');
const mustacheExpress = require('mustache-express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

// Routes
const publicRoutes = require('./routes/public');
const authRoutes = require('./routes/auth');
const organiserRoutes = require('./routes/organiser');
const app = express();
const PORT = 3000;

// Mustache templating engine setup
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'super-secret-dance-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Dance Booking App',
    user: req.session.user,
    isOrganiser: req.session.user?.role === 'organiser'
  });
});



// Public routes
app.use('/', publicRoutes);


// Authentication routes
app.use('/', authRoutes);


// Organiser routes
app.use('/', organiserRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
