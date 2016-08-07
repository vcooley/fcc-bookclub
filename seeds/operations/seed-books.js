module.exports = (knex, Promise) => () => {
  return Promise.all([
    knex('books').insert({
      id: 1,
      title: 'JavaScript: The Good Parts',
      isbn: '596517742',
      image_url: 'http://akamaicovers.oreilly.com/images/9780596517748/lrg.jpg',
    }),
    knex('books').insert({
      id: 2,
      title: 'All The King\'s Men',
      isbn: '9788371206399',
      image_url: 'http://pictures.abebooks.com/isbn/9780156012959-us.jpg',
    }),
    knex('books').insert({
      id: 3,
      title: 'Goodnight Moon',
      isbn: '9789990926378',
      image_url: 'https://i.harperapps.com/covers/9780694003617/y648.png',
    }),
  ]);
};
