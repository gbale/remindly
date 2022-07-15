import { NextFunction, Request, Response } from 'express';
import passport from '../middleware/passport';

const options: passport.AuthenticateOptions = {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
};

export const authController = {
  login: (req: Request, res: Response) => {
    res.render('auth/login', { hideNav: true });
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

  loginLocal: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', options)(req, res, next);
  },

  loginGithub: (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('github', options)(req, res, next);
  },

  registerSubmit: (req: Request, res: Response) => {
    // implement
  },
};

export default authController;
