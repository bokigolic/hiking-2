import { dummyReviews } from "../utils/dummy-reviews";
import { dummyTours } from "../utils/dummy-tours";

const initialState = {
  route: 'HOME',
  routeParams: {},
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
    data: dummyReviews,
    fetching: false
  },
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

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        myUserName: action.payload.username,
        myUserId: action.payload._id,
        route: 'HOME', // nakon login takodje redirektujemo na pocetnu stranu
        routeParams: {}
      };

    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        myUserName: '',
        myUserId: '',
        route: 'HOME', // nakon logout takodje redirektujemo na pocetnu stranu
        routeParams: {}
      };

    case 'TOURS_FETCHING':
      return {
        ...state,
        tours: {
          data: [],
          fetching: true
        }
      };
    case 'TOURS_FETCHED':
      return {
        ...state,
        tours: {
          data: action.payload,
          fetching: false
        }
      };
    case 'TOURS_FAIL':
      return {
        ...state,
        tours: {
          data: [],
          fetching: false
        }
      };

    default:
      return state;
  }
};

export default rootReducer;
