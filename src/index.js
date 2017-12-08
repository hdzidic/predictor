import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import FixtureList from './components/fixtureList';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path='/fixtures' component={FixtureList}/>
          <Route path='/' component={App}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));

registerServiceWorker();
