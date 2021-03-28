import { useReducer } from 'react';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';
import axios from 'axios';
import {
  SEARCH_USERS,
  SEARCH_USER,
  CLEAR_USERS,
  GET_REPO,
  SET_LOADING,
  SET_ERROR,
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repo: [],
    loading: false,
    error: '',
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      // setLoading(false);
      // setUsers(res.data.items);
      dispatch({
        type: SEARCH_USERS,
        payload: res.data.items,
      });
      // setError('');
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message || '發生錯誤',
      });
    }
  };

  // Get Single User
  const getUser = async username => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      console.log(res);

      dispatch({
        type: SEARCH_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
        payload: error.message || '發生錯誤',
      });
    }
  };

  // Get repo
  const getUserRepo = async username => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      dispatch({
        type: GET_REPO,
        payload: res.data,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  // Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  // Set Loading
  const setLoading = value => dispatch({ type: SET_LOADING, payload: value });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repo: state.repo,
        loading: state.loading,
        error: state.error,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepo,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
