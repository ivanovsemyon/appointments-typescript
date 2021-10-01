import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { appointmentsReducer } from "./reducers";

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const history = createBrowserHistory();

export const store = createStore(
  combineReducers({ appointmentsReducer, router: connectRouter(history) }),
  compose(applyMiddleware(thunk, routerMiddleware(history)), composeEnhancers())
);

export type applicationState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
