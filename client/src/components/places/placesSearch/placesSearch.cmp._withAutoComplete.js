import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Immutable from 'immutable';
// import Autocomplete from 'react-autocomplete'
import Autocomplete from '../../autocomplete/autocomplete.cmp'
import { setSearchFilter } from '../../../actions/filters.act';
import apiService from '../../../services/api.srv'
import { goToPlaceView } from '../../../services/router.srv'


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
        this._onSelect = this._onSelect.bind(this);

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

    _onSelect(searchValue, place) {
		if (place) {
				goToPlaceView(this.props.dispatch, place._id);
		} else {
			this.props.setSearchFilter(searchValue);
		}
    }

    _onKeyPress(e) {

        // console.log(e);
        // event.key === 'Enter' && ::this.handleSelect(event.target.value)
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

    render() {

        let inputProps = {
            placeholder: 'Search...',
            onKeyPress: this._onKeyPress
        };

        return (
            <Autocomplete
                initialValue ={this.props.searchFilter}
                inputProps={inputProps}
                ref="autocomplete"
                items={this.state.places}
                getItemValue={this._getItemValue}
                onSelect={this._onSelect}
                onChange={this._onChange}
                renderItem={this._renderItem} />
        );
    }

}


function mapStateToProps(state) {
    return {
        searchFilter: state.getIn(['filters', 'searchFilter'])
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSearchFilter: (searchValue) => dispatch(setSearchFilter(searchValue)),
        dispatch: dispatch
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PlacesSearch);
