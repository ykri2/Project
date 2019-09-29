import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';

/** 
 * App component
 * used as a wrapper around available routes
 **/

class App extends Component {
  render() { 
    return (
      <div className="app_component">
        <HeaderComponent />
        {this.props.children}
        <FooterComponent />
      </div>
    );
  }
}

export default App;
