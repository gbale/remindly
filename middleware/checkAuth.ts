import { NextFunction, Request, Response } from 'express';

module.exports = {
  ensureAuthenticated: function (req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  forwardAuthenticated: function (req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/reminders');
  },
};
