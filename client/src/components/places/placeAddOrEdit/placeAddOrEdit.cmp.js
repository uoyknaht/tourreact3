import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

export default class PlaceAddOrEdit extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this.render = this.render.bind(this);
    }

    onSubmit(e) {
      e.preventDefault();

      var _this = this;

      var place = {
          title: ReactDOM.findDOMNode(this.refs.title).value.trim(),
          address: ReactDOM.findDOMNode(this.refs.address).value.trim(),
          latitude: ReactDOM.findDOMNode(this.refs.latitude).value.trim(),
          longitude: ReactDOM.findDOMNode(this.refs.longitude).value.trim(),
          categories: []
      }

      if (this.props.place) {
          place._id = this.props.place._id;
      }

      console.log(place);
      this.props.addPlace(place);

      // PlaceActions.savePlace(data);
      // this.context.router.transitionTo('allPlaces');
    }

    render() {

        var title = this.props.place ?'Edit place' : 'Add new place';

        return (

          <form>

            <div className="form-group">
              <label>Title</label>
                <input type="text"
                      ref="title"
                      id="place-form-title"
                      placeholder="Title"
                      className="form-control" />
            </div>

            <div className="form-group">
              <label>Address</label>
                <input type="text"
                      ref="address"
                      id="place-form-address"
                      placeholder="Address"
                      className="form-control" />
            </div>

            <div className="form-group">
              <label>Latitude</label>
                <input type="text"
                      ref="latitude"
                      id="place-form-latitude"
                      placeholder="Address"
                      className="form-control" />
            </div>

            <div className="form-group">
              <label>Longitude</label>
                <input type="text"
                      ref="longitude"
                      id="place-form-longitude"
                      placeholder="Address"
                      className="form-control" />
            </div>

            <input type="submit"
              className="btn btn-default"
              value="Save"
              onClick={this.onSubmit} />

          </form>

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
