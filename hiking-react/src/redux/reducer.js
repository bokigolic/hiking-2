import { dummyReviews } from "../utils/dummy-reviews";
import { dummyTours } from "../utils/dummy-tours";
import { LOGIN_SUCCESS, LOGOUT, REFRESH, REVIEWS_FAIL, REVIEWS_FETCHED, REVIEWS_FETCHING, ROUTE_SET, ROUTE_WITH_PARAMS_SET, TOURS_FAIL, TOURS_FETCHED, TOURS_FETCHING } from "./actions";

const initialState = {
  route: 'HOME',
  routeParams: {},
  routeFreshness: 0,
  isLoggedIn: false,
  myUserName: '',
  myUserId: '',
  // tours: dummyTours,
  // tours: [],
  tours: {
    data: [],
    fetching: false
  },
  // reviews: dummyReviews,
  reviews: {
    data: [],
    fetching: false
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case ROUTE_SET:
      return {
        ...state,
        route: action.payload,
        routeParams: {},
        routeFreshness: state.routeFreshness + 1
      };

    case ROUTE_WITH_PARAMS_SET:
      return {
        ...state,
        route: action.payload.route,
        routeParams: action.payload.params,
        routeFreshness: state.routeFreshness + 1
      };

    case REFRESH:
      return {
        ...state,
        routeFreshness: state.routeFreshness + 1
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        myUserName: action.payload.username,
        myUserId: action.payload._id,
        route: 'HOME', // nakon login takodje redirektujemo na pocetnu stranu
        routeParams: {}
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        myUserName: '',
        myUserId: '',
        route: 'HOME', // nakon logout takodje redirektujemo na pocetnu stranu
        routeParams: {}
      };

    case TOURS_FETCHING:
      return {
        ...state,
        tours: {
          data: [],
          fetching: true
        }
      };
    case TOURS_FETCHED:
      return {
        ...state,
        tours: {
          data: action.payload,
          fetching: false
        }
      };
    case TOURS_FAIL:
      return {
        ...state,
        tours: {
          data: [],
          fetching: false
        }
      };


    case REVIEWS_FETCHING:
      return {
        ...state,
        reviews: {
          data: [],
          fetching: true
        }
      };
    case REVIEWS_FETCHED:
      return {
        ...state,
        reviews: {
          data: action.payload,
          fetching: false
        }
      };
    case REVIEWS_FAIL:
      return {
        ...state,
        reviews: {
          data: [],
          fetching: false
        }
      };


    default:
      return state;
  }
};

export default rootReducer;
