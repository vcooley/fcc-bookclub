module.exports = (knex, Promise) => () => {
  return Promise.all([
    knex('trades').insert({
      id: 1,
      requester: 1,
      requestee: 2,
      requester_book: 1,
      requestee_book: 2,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 2,
      requester: 2,
      requestee: 3,
      requester_book: 1,
      requestee_book: 2,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 3,
      requester: 1,
      requestee: 3,
      requester_book: 3,
      requestee_book: 1,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 4,
      requester: 2,
      requestee: 1,
      requester_book: 1,
      requestee_book: 3,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 5,
      requester: 3,
      requestee: 2,
      requester_book: 3,
      requestee_book: 1,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 6,
      requester: 3,
      requestee: 1,
      requester_book: 1,
      requestee_book: 3,
      requester_approval: false,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 7,
      requester: 1,
      requestee: 2,
      requester_book: 1,
      requestee_book: 3,
      requester_approval: true,
      requestee_approval: true,
    }),
    knex('trades').insert({
      id: 8,
      requester: 2,
      requestee: 3,
      requester_book: 3,
      requestee_book: 1,
      requester_approval: true,
      requestee_approval: false,
    }),
    knex('trades').insert({
      id: 9,
      requester: 1,
      requestee: 3,
      requester_book: 1,
      requestee_book: 3,
      requester_approval: true,
      requestee_approval: true,
    }),
  ]);
};
