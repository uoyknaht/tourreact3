import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class Home extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

        return (

            <div>
              <br/>
              <br/>
              <br/>
              <br/>
                Home
            </div>

        );
    }

}
