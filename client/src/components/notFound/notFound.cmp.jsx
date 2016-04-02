import React from 'react';

class NotFound extends React.Component {

    constructor() {
        super();
    }

    render() {       
        return (
            <div className="tr-main-block tr-not-found-container">
                <div className="alert alert-warning">
                    Page not found
                </div>
            </div>
        )
    }

}

export default NotFound;
