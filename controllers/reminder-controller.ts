import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { Reminder, reminderModel } from '../models/reminder-model';

export const remindersController = {
  admin: (req: Request, res: Response) => {
    let sessions = new Array();
    for (const [key, value] of Object.entries((req.sessionStore as any).sessions)) {
      sessions.push({
        sessionId: key,
        userId: JSON.parse(value as string).passport.user,
      });
    }
    console.log(sessions);
    res.render('reminder/admin', {
      name: (req.user as User).name,
      sessions,
    });
  },

  revoke: (req: Request, res: Response) => {
    const sessionId = req.params.id;
    req.sessionStore.destroy(sessionId, (err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/admin');
    });
  },

  dashboard: (req: Request, res: Response) => {
    res.render('reminder/dashboard', {
      name: (req.user as User).name,
    });
  },

  list: (req: Request, res: Response) => {
    let reminders: Reminder[] = [];
    try {
      const userId = (req.user as User).id;
      reminders = reminderModel.all(userId);
      res.render('reminder/index', { reminders });
    } catch (err: any) {
      console.error(err);
      res.redirect('/dashboard');
    }
  },

  new: (req: Request, res: Response) => {
    res.render('reminder/create');
  },

  listOne: (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const index = parseInt(req.params.id);
      const reminderItem = reminderModel.find(userId, index);
      res.render('reminder/single-reminder', { reminderItem, index });
    } catch (err: any) {
      console.error(err);
      res.redirect('/reminders');
    }
  },

  create: (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const reminder: Reminder = {
        title: req.body.title,
        description: req.body.description,
        isCompleted: false,
      };
      reminderModel.add(userId, reminder);
    } catch (err: any) {
      console.error(err);
    } finally {
      res.redirect('/reminders');
    }
  },

  edit: (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const index = parseInt(req.params.id);
      const reminderItem = reminderModel.find(userId, index);
      res.render('reminder/edit', { reminderItem, index });
    } catch (err: any) {
      console.error(err);
      res.redirect('/reminders');
    }
  },

  update: (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const index = parseInt(req.params.id);
      const reminderItem = reminderModel.find(userId, index);
      reminderItem.title = req.body.title;
      reminderItem.description = req.body.description;
      reminderItem.isCompleted = req.body.completed.toLowerCase() === 'true' ? true : false;
      reminderModel.update(userId, index, reminderItem);
    } catch (err: any) {
      console.error(err);
    } finally {
      res.redirect('/reminders');
    }
  },

  delete: (req: Request, res: Response) => {
    try {
      const userId = (req.user as User).id;
      const index = parseInt(req.params.id);
      reminderModel.delete(userId, index);
    } catch (err: any) {
      console.error(err);
    } finally {
      res.redirect('/reminders');
    }
  },
};

export default remindersController;
