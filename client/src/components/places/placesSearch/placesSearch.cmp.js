import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Immutable from 'immutable';
import Autocomplete from 'react-autocomplete'
import apiService from '../../../services/api.srv'


        let styles = {
          item: {
            padding: '2px 6px',
            cursor: 'default'
          },

          highlightedItem: {
            color: 'white',
            background: 'hsl(200, 50%, 50%)',
            padding: '2px 6px',
            cursor: 'default'
          },

          menu: {
            border: 'solid 1px #ccc'
          }
        }          

class PlacesSearch extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = {
            places: []
        };
    }

    _getItemValue(place) {
        return place.title;
    }

    _onChange(event, value) {
        if (!value || value.length < 3) {
            return;
        }

        this.setState({
            loading: true
        })

        apiService.get(`http://localhost:8081/api/places?search=${value}`)
            .then(
                places => {
                    this.setState({ 
                        places: places, 
                        loading: false 
                    })
                },
                error => {
                    this.setState({ 
                        loading: false 
                    })
                }
            )   
    }

    _renderItem(place, isHighlighted) {
        return (
            <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={place._id}
                id={place._id} >

                {place.title}
            </div>
        );
    }

    _onSelect(value, item) {
        this.setState({ 
            places: [ item ] 
        })
    }

    render() {

        return (

            <Autocomplete
                ref="autocomplete"
                items={this.state.places}
                getItemValue={this._getItemValue}
                onSelect={this._onSelect}
                onChange={this._onChange}
                renderItem={this._renderItem} />
        );
    }

}


function mapStateToProps(state,ownProps) {

    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);