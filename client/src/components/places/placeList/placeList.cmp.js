import React from 'react';
import { Link } from 'react-router';
import Loader from '../../loader/loader.cmp';
import CategoriesTitlesList from '../../categories/categoriesTitlesList/categoriesTitlesList.cmp.js'

class PlaceList extends React.Component {

    constructor() {
        super();        
        this.render = this.render.bind(this);
    }

    render() {
        let places = this.props.places;

        if (!places) {
            return (
                <Loader />
            );
        }

        if (!places.size) {
            return (
                <div className="alert alert-info" role="alert">No places found</div>
            );
        }

      var placesHtml = [];

      places.forEach((place) => {
          
          let style = {};
          let categories = place.get('categories')

          if (categories && categories.get(0)) {
            style = {
                borderLeft: '5px solid ' + categories.getIn([0, 'color'])
            }
          }

        placesHtml.push(
          <div to className="list-group-item" key={place.get('_id')} style={style}>

            <Link
                to={`/places/${place.get('slug')}`}
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
            <div className="list-group">
                {placesHtml}
            </div>
        );
    }

}

export default PlaceList
