import React from 'react';
// import React, {PropTypes, Component} from 'react/addons';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle} from './my_great_place_styles';

export default class Marker extends React.Component {
  // static propTypes = {
  //   text: PropTypes.string
  // };

  // static defaultProps = {};

  // shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = shouldPureComponentUpdate;
  }

  render() {
    return (
       <div style={greatPlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}