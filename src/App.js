import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Movie from './components/Movie/Movie';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/:movieId' exact component={Movie} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
