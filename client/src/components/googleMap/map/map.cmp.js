import React from 'react';

class GoogleMap extends React.Component {

    constructor() {
        super();
        this.render = this.render.bind(this);
        this.state = {
            isApiLoaded: false,
            map: {}
        };
    }

    componentDidMount() {

        var map = new google.maps.Map(
            document.getElementById('google-map'),
            {
                center: new google.maps.LatLng(this.props.initialCenter[0], this.props.initialCenter[1]),
                zoom: this.props.initialZoom
            }
        );

		map.addListener('click', (e) => {
			if (this.props.onClick) {
				let latLng = {
					lat: e.latLng.lat(),
					lng: e.latLng.lng()
				};

				this.props.onClick(latLng, map);
			}
	    });

        // TODO: find how to pass as props to marker cmp
        window.map = map;

        this.setState({
            isApiLoaded: true,
            map: map
        });

    }

    componentWillUnmount() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {

        // if (!this.state.isApiLoaded) {
        //     return (
        //         <div></div>
        //     );
        // }

        return (
            <div className="google-map">
                <div id="google-map" className="google-map"></div>
                {this.props.children}
            </div>
        );
    }

}

GoogleMap.propTypes = {
    initialZoom: React.PropTypes.number.isRequired,
    initialCenter: React.PropTypes.array.isRequired
};

export default GoogleMap;