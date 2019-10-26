import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import './styles/main.scss';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/';

const store = createStore(rootReducer, undefined, applyMiddleware(thunkMiddleware));

// Hot reloading for reducers
if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./redux/reducers/', () => store.replaceReducer(rootReducer))
}

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
