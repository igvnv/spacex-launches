import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';

import './styles/main.scss';

import App from './containers/App/App';
import rootReducer from './redux/reducers';

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunkMiddleware)
);

// Hot reloading for reducers
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./redux/reducers', () =>
    store.replaceReducer(rootReducer)
  );
}

ReactDOM.render(
  <Router basename="/spacex-launches">
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
