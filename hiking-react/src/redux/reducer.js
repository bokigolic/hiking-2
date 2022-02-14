import { dummyReviews } from "../utils/dummy-reviews";
import { dummyTours } from "../utils/dummy-tours";

const initialState = {
    route: 'HOME',
    routeParams: {},
    tours: dummyTours,
    reviews: dummyReviews,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ROUTE_SET':
            return {
                ...state,
                route: action.payload,
                routeParams: {}
            };

        case 'ROUTE_WITH_PARAMS_SET':
            return {
                ...state,
                route: action.payload.route,
                routeParams: action.payload.params
            };

        default:
            return state;
    }
};

export default rootReducer;
