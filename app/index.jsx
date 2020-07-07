import React from 'react';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import AppContainer from './containers/AppContainer';
import listOfTasks from './reducers';

const store = createStore(
  listOfTasks,
  applyMiddleware(thunk),
);

export default function Tasks() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
