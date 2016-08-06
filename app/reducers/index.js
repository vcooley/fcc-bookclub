import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import books from './books';

export default combineReducers({
  messages,
  auth,
  books,
});
