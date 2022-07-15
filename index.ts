require('dotenv').config();

import express, { NextFunction, Request, Response } from 'express';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import path from 'path';
import authController from './controllers/auth-controller';
import reminderController from './controllers/reminder-controller';
import { ensureAdmin, ensureAuthenticated, forwardAdmin, forwardAuthenticated } from './middleware/checkAuth';
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
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('='.repeat(100));

  console.log('User details are:');
  console.log(req.user);

  console.log('Entire session object:');
  console.log(req.session);

  console.log('Session details are:');
  console.log((req.session as any).passport);

  console.log('Session ID is:');
  console.log(req.sessionID);

  console.log('='.repeat(100));

  next();
});
*/

app.get('/admin', ensureAuthenticated, ensureAdmin, reminderController.admin);
app.get('/admin/:id/revoke', ensureAuthenticated, ensureAdmin, reminderController.revoke);
app.get('/dashboard', ensureAuthenticated, forwardAdmin, reminderController.dashboard);
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
