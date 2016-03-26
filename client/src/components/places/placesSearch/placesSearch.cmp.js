import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { setSearchFilter } from '../../../actions/filters.act';

class PlacesSearch extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this._search = this._search.bind(this);
		this._previousValue = null;
    }

    componentWillReceiveProps(newProps) {
        if (newProps.searchFilter !== this.props.searchFilter) {
            var value = newProps.searchFilter;

            if (!value) {
                value = '';
            }

            ReactDOM.findDOMNode(this.refs.placeSearch).value = value
        }
    }    

	_onKeyUp(e) {
		if (e.key !== 'Enter') {
			return;
		}

		this._search();
	}

	_onBlur() {
        this._search();
	}

	_search() {
		let value = ReactDOM.findDOMNode(this.refs.placeSearch).value.trim()

		if (value !== this._previousValue) {
			this.props.setSearchFilter(value);
			this._previousValue = value;
		}
	}

    render() {
        return (
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    ref="placeSearch"
                    defaultValue={this.props.searchFilter}
                    onKeyUp={this._onKeyUp}
                    onBlur={this._onBlur} />                
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Go!</button>
                </span>
            </div>         
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
