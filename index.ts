require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const path = require('path');
const passport = require('./middleware/passport');
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

/*app.use((req, res, next) => {
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});*/

const { ensureAuthenticated, forwardAuthenticated } = require('./middleware/checkAuth');
const reminderController = require('./controllers/reminder_controller');
const authController = require('./controllers/auth_controller');

app.get('/reminders', ensureAuthenticated, reminderController.list);
app.get('/reminder/new', ensureAuthenticated, reminderController.new);
app.get('/reminder/:id', ensureAuthenticated, reminderController.listOne);
app.get('/reminder/:id/edit', ensureAuthenticated, reminderController.edit);
app.post('/reminder/', ensureAuthenticated, reminderController.create);
app.post('/reminder/update/:id', ensureAuthenticated, reminderController.update);
app.post('/reminder/delete/:id', ensureAuthenticated, reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get('/register', forwardAuthenticated, authController.register);
app.get('/login', forwardAuthenticated, authController.login);
app.get('/logout', authController.logout);
app.post('/register', authController.registerSubmit);
//app.post('/login', authController.loginSubmit);
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/reminders',
    failureRedirect: '/login',
  })
);

app.listen(3001, function () {
  console.log(
    'Server running. Visit: localhost:3001/reminders in your browser 🚀'
  );
});
