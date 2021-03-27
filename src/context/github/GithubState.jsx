import { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import {
  SEARCH_USERS,
  SEARCH_USER,
  CLEAR_USERS,
  GET_REPO,
  SET_LOADING,
  SET_ALERT,
  REMOVE_ALERT,
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repo: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users

  // Get User

  // Get repo

  // Clear Users

  // Set Loading

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repo: state.repo,
        loading: state.loading,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
