export default function books(state = [], action) {
  switch (action.type) {
    case 'UPDATE_BOOKS':
      return action.books;
    default:
      return state;
  }
}
