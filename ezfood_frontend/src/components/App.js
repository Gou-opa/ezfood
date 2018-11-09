import React, { Component } from 'react';
import './App.css';
import Menu from './menuPage/menu';
import Manager from './managerPage/manager'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './header/header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/menu" component={Menu}/>
            <Route path="/manager" component={Manager} />
          </Switch>
        </div>
      </Router>

    );
  }
}
export default App;
