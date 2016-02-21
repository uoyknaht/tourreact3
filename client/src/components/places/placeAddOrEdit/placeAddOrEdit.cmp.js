import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect }            from 'react-redux';
import { routeActions } from 'react-router-redux';
import {
  getPlace,
  cleanActivePlace,
  createTempPlace,
  deleteTempPlace,
  createPlace,
  updatePlace,
  openPlaceCreateForm,
  openPlaceUpdateForm,
  closePlaceCreateForm,
  closePlaceUpdateForm
} from '../../../actions/placeActions';
import Loader from '../../loader/loader.cmp';
import notifierService from '../../../services/notifier.srv';
import { createMarker, getCurrentCenter, panMapToLatLng } from '../../../services/map.srv';

class PlaceAddOrEdit extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this._updateForm = this._updateForm.bind(this);
        this._setAdressFromCoordinates = this._setAdressFromCoordinates.bind(this);
        this.render = this.render.bind(this);

		this.state = {
			shouldAddMarkerOnMapClick: false
		};
    }

    componentDidMount() {
    	const placeId = this.props.placeId;

    	if (placeId) {
	        this.props.getPlace(placeId, true);
			this.props.openPlaceUpdateForm(placeId);
		}
		else {
			let centerLatLng = getCurrentCenter(window.map);
			this.props.createTempPlace(centerLatLng);
			this._updateFormLatLng(centerLatLng);
			this.props.openPlaceCreateForm();
			// this.setState({
			// 	shouldAddMarkerOnMapClick: true
			// });
		}
    }

	componentWillUnmount() {
		const placeId = this.props.placeId;

		if (placeId) {
			this.props.closePlaceUpdateForm(placeId);
		}
		else {
			this.props.closePlaceCreateForm();
            this.props.deleteTempPlace();
		}

		this.props.cleanActivePlace(true);
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

			let latLng = {
				lat: newProps.place.get('latitude'),
				lng: newProps.place.get('longitude')
			};

			panMapToLatLng(latLng, window.map);
        }

		if (this.props.latLngOnDragEnd !== newProps.latLngOnDragEnd) {
			this._updateFormLatLng(newProps.latLngOnDragEnd.toJS());
		}

		if (this.props.latLngOnMapClick !== newProps.latLngOnMapClick) {
			if (this.state.shouldAddMarkerOnMapClick) {
				// TODO: replace window.map
				createMarker(newProps.latLngOnMapClick.toJS(), window.map);
				this._updateFormLatLng(newProps.latLngOnMapClick.toJS());

				this.setState({
					shouldAddMarkerOnMapClick: false
				});
			}
		}

		// if (this.props.markerInEditMode !== newProps.markerInEditMode) {
		// 	if (this.props.markerInEditMode) {
		//
		// 	}
		// }

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
          place._id = this.props.place.get('_id');
      }

      if (place._id) {
        this.props.updatePlace(place);
      } else {
          this.props.createPlace(place);
      }
    }

    _updateForm(place) {
        if (place) {
            ReactDOM.findDOMNode(this.refs.title).value = place.get('title');
            ReactDOM.findDOMNode(this.refs.address).value = place.get('address');
            ReactDOM.findDOMNode(this.refs.latitude).value = place.get('latitude');
            ReactDOM.findDOMNode(this.refs.longitude).value = place.get('longitude');
        } else {
            ReactDOM.findDOMNode(this.refs.title).value = '';
            ReactDOM.findDOMNode(this.refs.address).value = '';
            ReactDOM.findDOMNode(this.refs.latitude).value = '';
            ReactDOM.findDOMNode(this.refs.longitude).value = '';
        }
    }

    _updateFormLatLng(latLng) {
        ReactDOM.findDOMNode(this.refs.latitude).value = latLng.lat;
        ReactDOM.findDOMNode(this.refs.longitude).value = latLng.lng;
    }

	_setAdressFromCoordinates(e) {
		e.preventDefault();

		let lat = ReactDOM.findDOMNode(this.refs.latitude).value.trim();
		let lng = ReactDOM.findDOMNode(this.refs.longitude).value.trim();
        let latlng = new google.maps.LatLng(lat, lng);
        let geocoder = new google.maps.Geocoder();

        geocoder.geocode({ 'latLng': latlng }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results && results[0]) {
                    var address = results[0].formatted_address;
                    ReactDOM.findDOMNode(this.refs.address).value = address;
                } else {
                	notifierService.warning('Could not determine address');
                }
            } else {
                 console.log('Geocoder failed due to: ' + status);
            }
        });
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

				  <br/>
					<a href="#" onClick={this._setAdressFromCoordinates}>Set address from coordinates</a>
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

}

function mapStateToProps(state, ownProps) {
  return {
    place: state.getIn(['places', 'itemInEditMode']),
    placeId: ownProps.params.id,
    isLoading: state.getIn(['places', 'isCreatingOrUpdatingItem']),
    lastCreatedItemId: state.getIn(['places', 'lastCreatedItemId']),
	latLngOnDragEnd: state.getIn(['map', 'latLngOnDragEnd']),
	latLngOnMapClick: state.getIn(['map', 'latLngOnMapClick']),
	markerInEditMode: state.getIn(['map', 'markerInEditMode'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPlace: (placeId, isForEdit) => dispatch(getPlace(placeId, isForEdit)),
    cleanActivePlace: (isForEdit) => dispatch(cleanActivePlace(isForEdit)),
    createTempPlace: (latLng) => dispatch(createTempPlace(latLng)),
    createPlace: (place) => dispatch(createPlace(place)),
    deleteTempPlace: () => dispatch(deleteTempPlace()),
    updatePlace: (place) => dispatch(updatePlace(place)),
    openPlaceCreateForm: () => dispatch(openPlaceCreateForm()),
    closePlaceCreateForm: () => dispatch(closePlaceCreateForm()),
    openPlaceUpdateForm: (placeId) => dispatch(openPlaceUpdateForm(placeId)),
    closePlaceUpdateForm: (placeId) => dispatch(closePlaceUpdateForm(placeId)),
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceAddOrEdit);
