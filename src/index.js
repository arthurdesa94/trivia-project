import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Game from './pages/Game';

ReactDOM.render(
  <BrowserRouter>
    {/* <Provider store={ store }> */}
    <Route exact path="/" component={ App } />
    <Route path="/game" component={ Game } />
    {/* </Provider> */}
  </BrowserRouter>,
  document.getElementById('root'),
);
