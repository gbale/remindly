const database: ReminderData = {
  '3a376d11-c20b-44a1-939c-fda98adb2b17': [{ title: 'abc', description: 'abcabc', isCompleted: false }],
};

interface ReminderData {
  [key: string]: Reminder[];
}

export interface Reminder {
  title: string;
  description: string;
  isCompleted: boolean;
}

const msgNoUser = (userId: string) => `Couldn't find reminders for user ID: ${userId}`;
const msgNoReminder = (index: number) => `Couldn't find reminder index: ${index}`;

export const reminderModel = {
  add: (userId: string, reminder: Reminder): void => {
    if (database[userId]) {
      database[userId].push(reminder);
      return;
    }
    throw new Error(msgNoUser(userId));
  },
  all: (userId: string): Reminder[] => {
    if (database[userId]) {
      return database[userId];
    }
    throw new Error(msgNoUser(userId));
  },
  delete: (userId: string, index: number): void => {
    if (database[userId]) {
      if (database[userId][index]) {
        database[userId].splice(index, 1);
        return;
      }
      throw new Error(msgNoReminder(index));
    }
    throw new Error(msgNoUser(userId));
  },
  init: (userId: string): void => {
    if (database[userId]) {
      return;
    }
    database[userId] = [];
    reminderModel.add(userId, {
      title: 'First Reminder',
      description: 'This is your first reminder',
      isCompleted: false,
    });
  },
  find: (userId: string, index: number): Reminder => {
    if (database[userId]) {
      if (database[userId][index]) {
        return database[userId][index];
      }
      throw new Error(msgNoReminder(index));
    }
    throw new Error(msgNoUser(userId));
  },
  update: (userId: string, index: number, reminder: Reminder): void => {
    if (database[userId]) {
      if (database[userId][index]) {
        database[userId][index] = reminder;
        return;
      }
      throw new Error(msgNoReminder(index));
    }
    throw new Error(msgNoUser(userId));
  },
};
