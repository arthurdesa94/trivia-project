import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={ store }> */}
    <Route exact path="/" component={ App } />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);
