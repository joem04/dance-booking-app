# 🕺 Dance Booking App

A Node.js and Express-based web application for managing dance class bookings, tailored for both organisers and participants.

## 🚀 Features

- **User Registration & Authentication**: Secure sign-up and login functionalities.
- **Course Management**: Organisers can create, edit, and delete courses with detailed schedules.
- **Booking System**: Participants can view and book available dance classes.
- **Dashboard**: Organisers have access to a dashboard to manage courses and view participants.

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/joem04/dance-booking-app

   cd dance-booking-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   node app.js
   ```

   The application will be running at `http://localhost:3000`.

## 📂 Project Structure

```
dance-booking-app/
├── models/
│   ├── users.js
│   └── courses.js
├── routes/
│   ├── organiser.js
│   └── auth.js
├── views/
│   ├── organiser-dashboard.mustache
│   ├── organiser-new-course.mustache
│   └── ...
├── public/
│   └── css/
│       └── style.css
├── tests/
│   └── organiser.test.js
├── app.js
└── package.json
```

## 👥 Contributors

- [Joe Mcskimming](https://github.com/joem04)
