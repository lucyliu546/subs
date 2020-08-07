
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  </BrowserRouter>,
  rootElement
);
