import React from "react";
import { Stitch } from "mongodb-stitch-browser-sdk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import Client from "./client.js";

export const client = Stitch.initializeDefaultAppClient("correla-lptqk");

const middleware = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleware));

export const DataProvider = ({ children }) => (
  <Provider store={store}>
    <Client client={client}>{children}</Client>
  </Provider>
);
