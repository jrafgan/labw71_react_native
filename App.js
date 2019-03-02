import React from 'react';
import reducer from './store/reducer';
import {Provider, connect} from 'react-redux';
import Main from "./components/Main";
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <Main/>
        </Provider>
    );
  }
}

