import { Request, Response } from 'express';
const passport = require('../middleware/passport.js');

export const authController = {
  login: (req: Request, res: Response) => {
    res.render('auth/login', { isLogin: true });
  },

  logout: (req: Request, res: Response) => {
    req.logout((err) => {
      if (err) {
        console.error(err);
      }
    });
    res.redirect('/');
  },

  register: (req: Request, res: Response) => {
    res.render('auth/register');
  },

  loginSubmit: (req: Request, res: Response) => {
    passport.authenticate('local', {
      successRedirect: '/reminders',
      failureRedirect: '/login',
    })(req, res);
  },

  registerSubmit: (req: Request, res: Response) => {
    // implement
  },
};

export default authController;
