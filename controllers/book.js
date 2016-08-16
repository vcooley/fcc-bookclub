const _ = require('lodash');
const googleBooks = require('googleapis').books('v1');
const Book = require('../models/Book');
const User = require('../models/User');

const apiKey = process.env.GOOGLE_API_KEY;

function handleError(err, res) {
  console.error(err);
  return res.status(500).send('Server Error.');
}

exports.index = (req, res) => {
  return Book.forge().fetchAll()
    .then(books => {
      return res.json(books.toJSON());
    })
    .catch(err => handleError(err, res));
};

exports.indexAvailable = (req, res) => {
  return Book.forge().fetch({ withRelated: ['owners'] }).then(books => {
    return res.json(books.filter(book => !book.owners.length));
  });
};

exports.indexOwned = (req, res) => {
  return User.forge({ id: req.user.id }).fetch({ withRelated: ['books'] }).then(user => {
    return res.json(user.toJSON().books);
  });
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
  if (!req.body.title) {
    return res.status(400).send('Bad Request.');
  }
  return googleBooks.volumes.list({
    auth: apiKey,
    q: req.body.title,
  }, (err, data) => {
    if (err) {
      return handleError(err, res);
    }
    const result = data.items[0];
    const isbn = result.volumeInfo.industryIdentifiers.find(identifier => {
      if (identifier.type !== 'ISBN_10' && identifier.type !== 'ISBN_13') {
        return false;
      }
      return true;
    }).identifier;
    const newBook = {
      google_id: result.id,
      title: result.volumeInfo.title,
      description: result.volumeInfo.description,
      isbn: isbn || 0,
      image_url: result.volumeInfo.imageLinks.thumbnail,
    };
    return Book.forge(newBook)
      .save()
      .then(book => res.json(book.toJSON()))
      .catch(err => handleError(err, res));
  });
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
