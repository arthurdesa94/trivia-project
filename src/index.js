import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import Game from './pages/Game';
import Settings from './pages/Settings';
import store from './store';
import FeedBack from './pages/FeedBack';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Route exact path="/" component={ App } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route path="/feedback" component={ FeedBack } />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
