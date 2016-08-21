import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';
import Owned from './components/Books/Owned';
import Available from './components/Books/Available';
import TradeContainer from './components/Trades/Container';
import Pending from './components/Trades/Pending';
import Requests from './components/Trades/Requests';
import Completed from './components/Trades/Completed';


export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES',
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Available} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup"
        component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account"
        component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/forgot"
        component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/reset/:token"
        component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/mybooks"
        component={Owned} onEnter={ensureAuthenticated} onLeave={clearMessages} />
      <Route path="/trades" component={TradeContainer}>
        <Route path="pending"
          component={Pending} onEnter={clearMessages} onLeave={clearMessages} />
        <Route path="requests"
          component={Requests} onEnter={clearMessages} onLeave={clearMessages} />
        <Route path="completed"
          component={Completed} onEnter={clearMessages} onLeave={clearMessages} />
      </Route>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
