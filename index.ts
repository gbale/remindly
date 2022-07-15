require('dotenv').config();

import express from 'express';
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
import passport from './middleware/passport';
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*
app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);
  next();
});
*/

const { ensureAuthenticated, forwardAuthenticated } = require('./middleware/checkAuth');
const reminderController = require('./controllers/reminder_controller');
import authController from './controllers/auth_controller';

app.get('/dashboard', ensureAuthenticated, reminderController.dashboard);
app.get('/reminders', ensureAuthenticated, reminderController.list);
app.get('/reminder/new', ensureAuthenticated, reminderController.new);
app.get('/reminder/:id', ensureAuthenticated, reminderController.listOne);
app.get('/reminder/:id/edit', ensureAuthenticated, reminderController.edit);
app.post('/reminder/', ensureAuthenticated, reminderController.create);
app.post('/reminder/update/:id', ensureAuthenticated, reminderController.update);
app.post('/reminder/delete/:id', ensureAuthenticated, reminderController.delete);
app.get('/register', forwardAuthenticated, authController.register);
app.get('/login', forwardAuthenticated, authController.login);
app.get('/logout', authController.logout);
app.post('/register', authController.registerSubmit);
app.post('/login', authController.loginLocal);
app.get('/login/github', authController.loginGithub);
app.get('/auth/github/callback', authController.loginGithub);

app.listen(3001, function () {
  console.log('Server running. Visit: http://localhost:3001/reminders in your browser 🚀');
});
