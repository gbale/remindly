let database = require("../database");

/**
 * Looks up a reminder in the given database reminders array using the given reminder ID
 * @param {[]} database 
 * @param {number} id 
 * @returns Object containing the reminder item and index if found, or null and -1 respectively
 */
const findReminder = (database, id) => {
  const index = database.reminders.findIndex(reminder => reminder.id == id);
  return {
    reminderItem: (index > -1) ? database.reminders[index] : null,
    index
  };
};

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const { reminderItem } = findReminder(database.cindy, req.params.id);
    if (reminderItem) {
      res.render("reminder/single-reminder", { reminderItem });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  },

  create: (req, res) => {
    const reminder = {
      id: database.cindy.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database.cindy.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    const { reminderItem } = findReminder(database.cindy, req.params.id);
    res.render("reminder/edit", { reminderItem });
  },

  update: (req, res) => {
    const { reminderItem, index } = findReminder(database.cindy, req.params.id);
    if (reminderItem) {
      reminderItem.title = req.body.title;
      reminderItem.description = req.body.description;
      reminderItem.completed = req.body.completed.toLowerCase() === 'true' ? true : false;
      database.cindy.reminders[index] = reminderItem;
      res.redirect('/reminders');
    }
  },

  delete: (req, res) => {
    const { index } = findReminder(database.cindy, req.params.id);
    if (index > -1) {
      database.cindy.reminders.splice(index);
      res.redirect("/reminders");
    }
  },
};

module.exports = remindersController;
