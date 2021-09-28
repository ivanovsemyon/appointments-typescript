import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { appointmentsReducer } from "./reducers";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  combineReducers({ appointmentsReducer }),
  compose(applyMiddleware(thunk), composeEnhancers())
);
