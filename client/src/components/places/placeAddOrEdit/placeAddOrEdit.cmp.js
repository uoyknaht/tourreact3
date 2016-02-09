import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect }            from 'react-redux';
import { routeActions } from 'react-router-redux';
import { fetchPlace, cleanActivePlace, createPlace, updatePlace } from '../../../actions/placeActions';
import Loader from '../../loader/loader.cmp';

class PlaceAddOrEdit extends React.Component {

    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
        this._updateForm = this._updateForm.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount() {
        console.log('place add or edit cmp mounted');

      const placeId = this.props.placeId;

      if (placeId) {
        this.props.fetchPlace(placeId, true);
      }
    }

     componentWillReceiveProps(newProps) {

        console.log(newProps);
        let { routeParams } = this.props;

        // -. if there was no place (was crreating, and response from server received with created place id)


        if (newProps.lastCreatedItemId && newProps.lastCreatedItemId !== this.props.lastCreatedItemId) {
            this.props.dispatch(routeActions.push('/places/`${newProps.lastCreatedItemId}`/edit'));
        }

        // -. after creating place and click submit, redirecting to edit view
            // there is no place. Does it is when redirecting to edit?
            // url is changed but component stays the same
            // there was no routeParams.id, no it is


        if (!routeParams.id && newProps.routeParams.id) {
            console.log('redirected from create view to edit view');
        }



        // -. coming from place list. 
            //  id is always set
            // At first there is no place. When it is received from server, place is set


        // console.log(newProps);
        else if (!this.props.place && newProps.place) {
            console.log(newProps.place)
         this._updateForm(newProps.place);
       }
     }

     componentWillUnmount() {
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
    dispatch: dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceAddOrEdit);
