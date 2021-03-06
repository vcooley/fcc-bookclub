export default function messages(state = {}, action) {
  switch (action.type) {
    case 'ADD_TRADE_FAILURE':
    case 'REMOVE_TRADE_FAILURE':
    case 'FETCH_BOOK_FAILURE':
    case 'ADD_BOOK_ERROR':
    case 'LOGIN_FAILURE':
    case 'SIGNUP_FAILURE':
    case 'UPDATE_PROFILE_FAILURE':
    case 'CHANGE_PASSWORD_FAILURE':
    case 'FORGOT_PASSWORD_FAILURE':
    case 'RESET_PASSWORD_FAILURE':
    case 'CONTACT_FORM_FAILURE':
    case 'OAUTH_FAILURE':
    case 'UNLINK_FAILURE':
    case 'LINK_FAILURE':
      return {
        error: action.messages,
      };
    case 'ADD_BOOK_SUCCESS':
    case 'ADD_TRADE_SUCCESS':
    case 'REMOVE_TRADE_SUCCESS':
    case 'UPDATE_PROFILE_SUCCESS':
    case 'CHANGE_PASSWORD_SUCCESS':
    case 'RESET_PASSWORD_SUCCESS':
    case 'CONTACT_FORM_SUCCESS':
      return {
        success: action.messages,
      };
    case 'FORGOT_PASSWORD_SUCCESS':
    case 'DELETE_ACCOUNT_SUCCESS':
    case 'UNLINK_SUCCESS':
      return {
        info: action.messages,
      };
    case 'CLEAR_MESSAGES':
      return {};
    default:
      return state;
  }
}
