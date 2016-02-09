import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect }            from 'react-redux';
import { routeActions } from 'react-router-redux';
import {
  fetchPlace,
  cleanActivePlace,
  createPlace,
  updatePlace,
  openPlaceCreateOrUpdateForm,
  closePlaceCreateOrUpdateForm
} from '../../../actions/placeActions';
import Loader from '../../loader/loader.cmp';

class PlaceAddOrEdit extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this._updateForm = this._updateForm.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
      this.props.openPlaceCreateOrUpdateForm();

      const placeId = this.props.placeId;

      if (placeId) {
        this.props.fetchPlace(placeId, true);
      }
    }

     componentWillReceiveProps(newProps) {

        // redirecting after create place
        if (newProps.lastCreatedItemId && newProps.lastCreatedItemId !== this.props.lastCreatedItemId) {
           this.props.dispatch(routeActions.push(`/places/${newProps.lastCreatedItemId}`));
        }
        // redirecting after edit place
        else if (newProps.lastUpdatedItemId && newProps.lastUpdatedItemId !== this.props.lastUpdatedItemId) {
           this.props.dispatch(routeActions.push(`/places/${newProps.lastCreatedItemId}`));
        }
        // prefilling form data in after opening edit place
        else if (!this.props.place && newProps.place) {
         this._updateForm(newProps.place);
       }
     }

     componentWillUnmount() {
       this.props.closePlaceCreateOrUpdateForm();
       this.props.cleanActivePlace(true);
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

      if (place._id) {
        this.props.updatePlace(place);
      } else {
          this.props.createPlace(place);
      }



//  SHOW LOADER!!!

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

        if (this.props.isLoading) {
            return (
              <Loader />
            );
        }


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

function mapStateToProps(state, ownProps) {
  return {
    place: state.places.itemInEditMode,
    placeId: ownProps.params.id,
    isLoading: state.places.isCreatingOrUpdatingItem,
    lastCreatedItemId: state.places.lastCreatedItemId
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlace: (placeId, isForEdit) => dispatch(fetchPlace(placeId, isForEdit)),
    cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
    createPlace: (place) => dispatch(createPlace(place)),
    updatePlace: (place) => dispatch(updatePlace(place)),
    openPlaceCreateOrUpdateForm: () => dispatch(openPlaceCreateOrUpdateForm()),
    closePlaceCreateOrUpdateForm: () => dispatch(closePlaceCreateOrUpdateForm()),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceAddOrEdit);
