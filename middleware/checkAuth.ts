import { NextFunction, Request, Response } from 'express';
import { Role, User } from '../models/user-model';

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/reminders');
};

export const forwardAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User).role === Role.User) {
    return next();
  }
  res.redirect('/admin');
};

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User).role === Role.Admin) {
    return next();
  }
  res.redirect('/dashboard');
};
