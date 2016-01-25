import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/nav/nav.cmp';
//import Router from 'react-router';
//import routes from './routes';

(function () {

    'use strict';

    // Router.run(routes, Router.HistoryLocation, function (Handler, state) {
    // Router.run(routes, function (Handler, state) {
    //     var params = state.params;
    //     React.render(<Handler params={params}/>, document.body);
    // });


    var CommentBox = React.createClass({
      render: function() {
        return (
          <div className="commentBox">
            Hello, world! I am a CommentBox.
          </div>
        );
      }
    });
    ReactDOM.render(
      <Nav />,
      document.getElementById('app')
    );


})();
