let database = require("../database");

const findReminder = (reminderId) =>
  database.cindy.reminders.find(reminder => reminder.id == reminderId);

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    const searchResult = findReminder(req.params.id);
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
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
    const searchResult = findReminder(req.params.id);
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
  },

  delete: (req, res) => {
    const searchResult = findReminder(req.params.id);
    if (searchResult) {
      database.cindy.reminders.splice(database.cindy.reminders.indexOf(searchResult));
      res.redirect("/reminders");
    }
  },
};

module.exports = remindersController;
