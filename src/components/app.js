import React from 'react';
import { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        {/*// Display router child components*/}
        {this.props.children}
    </div>
    );
  }
}
