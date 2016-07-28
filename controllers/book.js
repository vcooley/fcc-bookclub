const _ = require('lodash');
const Book = require('../models/Book');

function handleError(err, res) {
  console.log(err)
  return res.status(500).send('Server Error.');
}

exports.index = (req, res) => {
  return Book.forge().fetchAll()
  .then(books => {
    return res.json(books.toJSON());
  })
  .catch(err => handleError(err, res));
};

exports.show = (req, res) => {
  return Book.forge({ id: req.params.id }).fetch()
  .then(book => {
    if (!book) {
      return res.status(404).send('Not Found.');
    }
    return res.json(book.toJSON());
  })
  .catch(err => handleError(err, res));
};

exports.create = (req, res) => {
  console.log(req.body)
  if (!req.body.title) {
    return res.status(400).send('Bad Request.');
  }
  return Book.forge({ title: req.body.title })
  .save()
  .then(book => res.json(book.toJSON()))
  .catch(err => handleError(err, res));
};

exports.update = (req, res) => {
  const data = Object.extend({}, req.body);
  return Book.forge({ id: req.params.id })
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
  return Book.forge({ id: req.params.id }).fetch({ required: true })
  .then(book => book.destroy())
  .then(() => res.status(204))
  .catch(err => handleError(err, res));
};
