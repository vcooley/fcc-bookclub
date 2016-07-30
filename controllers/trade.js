const _ = require('lodash');
const Trade = require('../models/Trade');

function handleError(err, res) {
  console.log(err)
  return res.status(500).send('Server Error.');
}

exports.index = (req, res) => {
  return Trade.forge().fetchAll()
  .then(trades => {
    return res.json(trades.toJSON());
  })
  .catch(err => handleError(err, res));
};

exports.show = (req, res) => {
  return Trade.forge({ id: req.params.id }).fetch()
  .then(trade => {
    if (!trade) {
      return res.status(404).send('Not Found.');
    }
    return res.json(trade.toJSON());
  })
  .catch(err => handleError(err, res));
};

exports.create = (req, res) => {
  req.checkBody('requestee', 'Requires requestee.').notEmpty().isInt();
  req.checkBody('requesteeBook', 'Requires requestee book.').notEmpty().isInt();
  return Trade.forge({
    requester: req.user.id,
    requestee: req.body.requestee,
    requestee_book: req.body.requesteeBook,
  })
  .save()
  .then(trade => res.json(trade.toJSON()))
  .catch(err => handleError(err, res));
};

exports.update = (req, res) => {
  const data = Object.extend({}, req.body);
  return Trade.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(book => {
    data.id = book.id;
    return book.save(_.assign(book, req.body));
  })
  .catch(err => handleError(err, res));
};

exports.remove = (req, res) => {
  if (!req.body.id) {
    return res.status(400).send('Bad Request.');
  }
  return Trade.forge({ id: req.params.id }).fetch({ required: true })
  .then(book => book.destroy())
  .then(() => res.status(204))
  .catch(err => handleError(err, res));
};
