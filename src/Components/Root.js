import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import App from './App';
import MainComponent from './MainComponent';

/** 
 * Root component 
 * Wraps app and routes to provider
 **/

const Root = ({ store }) => (
      
      <Provider store={store} >
        <Router basename="/Project/"  >
              <Switch>
                  <App >
                    <Route exact path="/" component={() => { console.log("A");  return <MainComponent /> } } />
                  </App>
            </Switch>
        </Router>
      </Provider>
      )


Root.propTypes = {
    store: PropTypes.object.isRequired
  }

export default Root;