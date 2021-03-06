const db = require('../db/db.js');
const messageController = {};

messageController.getMessages = (req, res, next) => {
  const queryString = `
    SELECT * 
    FROM Messages`;

  db.query(queryString)
    .then(response => {
      res.locals.messages = response.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

messageController.postMessage = (req, res, next) => {
  const { message } = req.body;

  const queryString = `
    INSERT INTO Messages message VALUES $1
    `;
  const values = [message];

  db.query(queryString, values)
    .then((response) => {
      response.rows[0];
      res.locals.newMessage;
      next();
    })
    .catch(err => {
      return next(err);
    });
};

messageController.deleteMessage = (req, res, next) => {
  const id = req.params.id;

  const queryString = `
  DELETE 
  FROM Messages 
  WHERE id = $1`;
  const values = [id];

  db.query(queryString, values)
    .then((response) => {
      res.locals.deleted = response.rows[0];
      next();
    })
    .catch(err => {
      next(err);
    });
};

module.exports = messageController;
