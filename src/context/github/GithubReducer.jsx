import {
  SEARCH_USERS,
  SEARCH_USER,
  CLEAR_USERS,
  GET_REPO,
  SET_LOADING,
  SET_ERROR,
} from '../types';

const GithubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: '',
      };

    case SEARCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: '',
      };

    case GET_REPO:
      return {
        ...state,
        repo: action.payload,
        loading: false,
        error: '',
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
        error: '',
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default GithubReducer;
