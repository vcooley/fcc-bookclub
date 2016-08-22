const _ = require('lodash');
const Trade = require('../models/Trade');
const Book = require('../models/Book');

function handleError(err, res) {
  return res.status(err.code || 500).send({ msg: err.msg || 'Server Error.' });
}

// endpoint /api/trade
// GET /
exports.index = (req, res) => {
  return Trade.forge().fetchAll()
  .then(trades => {
    return res.json(trades.toJSON());
  })
  .catch(err => handleError(err, res));
};

// GET /:id
exports.show = (req, res) => {
  return Trade.forge({ id: req.params.id }).fetch()
  .then(trade => {
    if (!trade) {
      return handleError({ code: 404, msg: 'Not Found.' }, res);
    }
    return res.json(trade.toJSON());
  })
  .catch(err => handleError(err, res));
};

// GET /pending
exports.showPending = (req, res) => {
  return Trade.forge({ requester: req.user.id }).fetchAll().then(trades => {
    return res.json(trades.toJSON().filter(trade => {
      return !(trade.requester_approval && trade.requestee_approval);
    }));
  });
};

// GET /requests
exports.showRequests = (req, res) => {
  return Trade.forge({ requestee: req.user.id }).fetchAll().then(trades => {
    return res.json(trades.toJSON().filter(trade => {
      return !(trade.requester_approval && trade.requestee_approval);
    }));
  });
};

// GET /completed
exports.showCompleted = (req, res) => {
  return Trade.where('requester', req.user.id, 'or', 'requestee', req.user.id)
    .fetchAll()
    .then(trades => {
      return res.json(trades.toJSON().filter(trade => {
        return (trade.requester_approval && trade.requestee_approval);
      }));
    });
};


// POST /
exports.create = (req, res) => {
  if (!req.isAuthenticated()) {
    return handleError({ code: 401, msg: 'Requires login.' }, res);
  }
  req.checkBody('requestee', 'Requires requestee.').notEmpty().isInt();
  req.checkBody('requesteeBook', 'Requires requestee book.').notEmpty().isInt();
  const errors = req.validationErrors();
  if (errors) {
    return handleError({ code: 400, msg: errors });
  }

  return Trade.forge({
    requester: req.user.id,
    requestee: req.body.requestee,
    requestee_book: req.body.requesteeBook,
  })
  .save()
  .then(trade => res.json(trade.toJSON()))
  .catch(err => handleError(err, res));
};

// PUT /:id
exports.update = (req, res) => {
  const data = Object.extend({}, req.body);
  return Trade.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(book => {
    data.id = book.id;
    return book.save(_.assign(book, data));
  })
  .catch(err => handleError(err, res));
};

// DELETE /:id
exports.remove = (req, res) => {
  if (!req.body.id) {
    return handleError({ code: 400, msg: 'Bad Request' }, res);
  }
  return Trade.forge({ id: req.params.id }).fetch({ required: true })
    .then(trade => {
      if (req.isAuthenticated() && (user.id === trade.requester || user.id === trade.requestee)){
        book.destroy();
        return res.status(204);
      }
      throw { code: 401, msg: 'Unauthorized.' };
    })
    .catch(err => handleError(err, res));
};

// POST /:id/approve
exports.approve = (req, res) => {
  return new Trade({ id: req.params.id })
    .fetch()
    .then(trade => {
      if (!trade) {
        return handleError({ code: 404, msg: 'Not Found.', res });
      }
      if (!req.isAuthenticated()) {
        return handleError({ code: 401, msg: 'Unauthorized.' }, res);
      }
      if (req.user.toJSON().id === trade.toJSON().requester) {
        trade.set('requester_approval', true);
        return trade.save().then(() => res.json(trade));
      }
      if (req.user.toJSON().id === trade.toJSON().requestee) {
        trade.set('requestee_approval', true);
        return trade.save().then(() => res.json(trade));
      }

      return handleError({ code: 401, msg: 'Unauthorized.' }, res);
    });
};

// POST /:tradeId/select-book/:bookId
exports.selectBook = (req, res) => {
  req.check('tradeId', 'Trade must be an integer.').notEmpty().isInt();
  req.check('bookId', 'Book must be an integer.').notEmpty().isInt();
  const errors = req.validationErrors();
  if (errors) {
    return handleError(errors, res);
  }
  return Trade.forge({ id: req.params.tradeId })
    .fetch()
    .then(trade => {
      const valuesToUpdate = { trade };
      if (!req.isAuthenticated()) {
        throw new Error({ code: 401, msg: 'Requires login.' });
      }
      // Allow requester to change requestee book
      if (trade.get('requester') === req.user.id) {
        valuesToUpdate.userBook = 'requestee_book';
        return valuesToUpdate;
      }
      // Allow requestee to change requester book
      if (trade.get('requestee') === req.user.id) {
        valuesToUpdate.userBook = 'requester_book';
        return valuesToUpdate;
      }
      throw new Error({ code: 401, msg: 'Unauthorized.' });
    })
    .then(({ userBook, trade }) => {
      return Book.forge({ id: req.params.bookId })
        .fetch({ require: true })
        .then(book => {
          trade.set(userBook, book.get('id'));
          return trade.save();
        })
        .catch(() => {
          throw new Error({ code: 404, msg: 'Book not found.' });
        });
    })
    .then(trade => res.json(trade))
    .catch(err => handleError(err, res));
};
