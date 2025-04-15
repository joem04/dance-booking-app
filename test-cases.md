# ✅ Test Case Document – Dance Booking App

## 📌 Project Summary

A Node.js & Express web application for booking and managing dance classes. Users can register and book classes, while organizers can create, edit, and manage courses and view participants.

---

## 📋 Test Cases

| Test Case ID | Feature                    | Description                                               | Steps                                                                                 | Expected Result                                         | Pass/Fail |
|--------------|----------------------------|-----------------------------------------------------------|----------------------------------------------------------------------------------------|---------------------------------------------------------|-----------|
| TC001        | User Registration          | Register a new user                                       | Go to /register, fill form, submit                                                    | User is redirected to /courses and session starts       |     ✅      |
| TC002        | Login                      | Log in with valid credentials                             | Go to /login, enter valid credentials, submit                                         | Redirected to /courses and session begins               |     ✅      |
| TC003        | Invalid Login              | Try logging in with wrong password                        | Go to /login, enter wrong password, submit                                            | Error message displayed or login fails                  |      ✅     |
| TC004        | View Courses               | Browse all available courses                              | Visit /courses                                                                         | List of courses with links appears                      |      ✅     |
| TC005        | View Course Details        | See full details of a selected course                     | Click on any course from /courses                                                     | Detailed view shown with description, price, schedule   |      ✅     |
| TC006        | Book a Course              | Enroll in a class                                         | Click enroll on a course detail page                                                  | Redirected to course detail with success                |      ✅     |
| TC007        | Duplicate Booking          | Try booking the same course again                         | Enroll in course again                                                                 | Redirects with no duplicate added                       |     ✅      |
| TC008        | Organizer Login            | Log in as organiser                                       | Log in with organiser credentials                                                     | Organizer dashboard becomes accessible                  |      ✅     |
| TC009        | Add New Course             | Organizer creates a new course                            | Go to /organiser/courses/new, fill and submit                                         | Course added and listed in dashboard                    |      ✅     |
| TC010        | Edit Course                | Organizer edits a course                                  | From dashboard, click "Edit", change details, submit                                  | Course updates with new info and schedule               |      ✅     |
| TC011        | Edit Schedule              | Organizer adds or removes sessions                        | Edit a course, add sessions with date & time, save                                    | Schedule appears correctly in detail view               |      ✅     |
| TC012        | Delete Course              | Organizer deletes a course                                | From dashboard, click "Delete"                                                        | Course is removed from listing                          |      ✅     |
| TC013        | View Participants          | Organizer views who is booked on a course                 | From dashboard, click "View Participants" on a course                                 | List of usernames shown                                 |       ✅    |
| TC014        | Access Control             | Non-organiser tries to access /organiser/dashboard        | Log in as a user, manually enter organiser dashboard URL                              | Access denied (403 or redirect)                         |       ✅    |
| TC015        | Logout                     | Any user logs out                                         | Click logout in nav bar                                                               | Redirects to home page, session cleared                 |       ✅    |

---