import React from 'react';
import { connect } from 'react-redux';
// import { fetchPlace, cleanActivePlace } from '../../../actions/placeActions';

class PageTitle extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    render() {

        return (
          <div>
          {/*
            <h1>
              Page title
            </h1>
          </div>
          */}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageTitle);
