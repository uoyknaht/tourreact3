import React from 'react';
import Router from 'react-router';
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import { connect } from 'react-redux';
import { getPlace } from '../../../actions/placeActions';

class PlaceView extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
    }

    componentDidMount() {
      const { dispatch } = this.props;
      var _this = this;

      dispatch(getPlace());
    }

    render() {

      var id = this.props.params.id;

        return (

            <div>
              Place view: {id}
            </div>

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
    place: state.place,
    placeId: ownProps.params.id,
  };
}

export default connect(mapStateToProps)(PlaceView);
