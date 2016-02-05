import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

class PlaceAddOrEdit extends React.Component {

    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this._updateForm = this._updateForm.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        this._updateForm(this.props.place);
        //this.isFormOfTypeCreate = this.props.place ? false : true;
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

    _updateForm(place) {
        if (place) {
            ReactDOM.findDOMNode(this.refs.title).value = place.title;
            ReactDOM.findDOMNode(this.refs.address).value = place.address;
            ReactDOM.findDOMNode(this.refs.latitude).value = place.latitude;
            ReactDOM.findDOMNode(this.refs.longitude).value = place.longitude;
        } else {
            ReactDOM.findDOMNode(this.refs.title).value = '';
            ReactDOM.findDOMNode(this.refs.address).value = '';
            ReactDOM.findDOMNode(this.refs.latitude).value = '';
            ReactDOM.findDOMNode(this.refs.longitude).value = '';     
        }
    }     

    render() {

        var place = this.props.place;
        var title = place ?'Edit place' : 'Add new place';

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

function mapStateToProps(state,ownProps) {
  return {
    place: state.places.itemInEditMode
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //fetchPlace: (placeId) => dispatch(fetchPlace(placeId))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlaceAddOrEdit);
