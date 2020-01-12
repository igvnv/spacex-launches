import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/main.scss';

import App from './containers/App';
import rootReducer, { AppState } from './store/reducers';
import { AppActions } from './store/actions';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppActions>)
);

ReactDOM.render(
  <Router basename="/spacex-launches">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
