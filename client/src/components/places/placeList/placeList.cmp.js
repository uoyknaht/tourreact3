import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { bindActionCreators } from 'redux';
import { getPlaces } from '../../../actions/placeActions';
import { connect }            from 'react-redux';
import Loader from '../../loader/loader.cmp';
import CategoryList from '../../categories/categoryList/categoryList.cmp';
import CategoriesTitlesList from '../../categories/categoriesTitlesList/categoriesTitlesList.cmp.js'
import PlacesFilter from '../placesFilter/placesFilter.cmp'
import PlacesSearch from '../placesSearch/placesSearch.cmp'
import getThumbUrl from '../../../services/images.srv'

//@connect(state => ({ places: state.places }))
class PlaceList extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {
        let places = this.props.places;
        let filterCmp = (
            <PlacesFilter routeParams={this.props.location} />
        );

        if (!places) {
            return (
                <div>
                    {filterCmp}
                    <Loader />
                </div>
            );
        }

        if (!places.size) {
            return (
                <div>
                    {filterCmp}
					<div className="row">
	                    <div className="col-md-6">
	                        <Link to={`/places/actions/create`}>Create new</Link>
	                        <br/>
	                    </div>
	                    <div className="col-md-6">
	                        <PlacesSearch />
	                    </div>
	                </div>					
                    <CategoryList />
                    <br/>
                    <div className="alert alert-info" role="alert">No places found</div>
                </div>
            );
        }

      var placesHtml = [];

      // let url = getThumbUrl()

      places.forEach((place) => {
          
          let style = {};
          let categories = place.get('categories')

          if (categories && categories.get(0)) {
            style = {
                borderLeft: '5px solid ' + categories.getIn([0, 'color'])
            }
          }
          

        // let image = '';
        // let images = place.get('images');
        

        // if (images) {
        //     // let url = getThumbUrl(images.get(0))
        //     // url = getThumbUrl()
        //     // let url = images.get(0)
        //     // console.log(url);
        //     // image = <img src={url} />;
        //     // image = <img src="' + url + '" />;
        //     // image = '<img src="' + images.get(0) + '" />';
        // <img src={url} />

        placesHtml.push(
          <div to className="list-group-item" key={place.get('_id')} style={style}>

            <Link
                to={`/places/${place.get('_id')}`}
                className="list-group-item-heading">

                {place.get('title')}
            </Link>

            <p className="list-group-item-text">
                Categories:&nbsp;
                <CategoriesTitlesList
                    placeId={place.get('_id')}
                    categories={place.get('categories')} />
            </p>
            
          </div>
        );
      });

        return (
            <div>
                {filterCmp}
                <div className="row">
                    <div className="col-md-6">
                        <Link to={`/places/actions/create`}>Create new</Link>
                        <br/>
                    </div>
                    <div className="col-md-6">
                        <PlacesSearch />
                    </div>
                </div>

                <CategoryList />
                <br/>
                  <div className="list-group">
                    {placesHtml}
                  </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
	return {
	    places: state.getIn(['places', 'places']),
        location: ownProps.location
	}
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);
