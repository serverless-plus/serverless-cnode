import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
const isServer = typeof window === 'undefined';

let middlewares = [thunkMiddleware];
if (isServer) {
  middlewares = middlewares.concat([createLogger()]);
}
export const initializeStore = (initialState = {}) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  );
  return store;
};
