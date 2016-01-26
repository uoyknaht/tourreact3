import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class PlaceView extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

      var id = this.props.params.id;

        return (

            <div>
              Place view: {id}
            </div>

        );
    }

    // componentDidMount() {
    //   // from the path `/inbox/messages/:id`
    //   const id = this.props.params.id
    //
    //   fetchMessage(id, function (err, message) {
    //     this.setState({ id: id })
    //   })
    // },

}
