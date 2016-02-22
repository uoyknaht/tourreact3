import { routeActions } from 'react-router-redux';

export function goToPlaceView(dispatch, placeId) {
    dispatch(routeActions.push(`/places/${placeId}`));
}