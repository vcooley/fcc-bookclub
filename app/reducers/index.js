import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import books from './books';
import trades from './trades';

export default combineReducers({
  messages,
  auth,
  books,
  trades,
});
