import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './pages/About';

import NavBar from './components/layout/NavBar';
import Search from './components/users/Search';
import Users from './components/users/Users.jsx';
import SingleUser from './components/users/SingleUser';
import Alert from './components/ui/Alert.jsx';

import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repo, setRepo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState(null);

  // search users
  const searchUsers = async text => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setUsers(res.data.items);
      setError('');
    } catch (error) {
      setLoading(false);
      setError('找不到');
    }
  };

  // get single user
  const getUser = async username => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setUser(res.data);
      setError('');
    } catch (error) {
      setLoading(false);
    }
  };

  // get user repos
  const getUserRepo = async username => {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      setLoading(false);
      setRepo(res.data);
      setError('');
    } catch (error) {
      setLoading(false);
    }
  };

  // set alert and clear alert
  const handleAlert = (msg, type) => {
    if (type === 'clearAlert') {
      setAlert(null);
      return;
    }

    setAlert({ msg, type });
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  return (
    <GithubState>
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Alert alert={alert} />

            <Switch>
              {/* Root */}
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      setAlert={handleAlert}
                    />
                    <Users users={users} isLoading={isLoading} error={error} />
                  </Fragment>
                )}
              />

              {/* About page */}
              <Route exact path="/about" component={About} />

              {/* Single user */}
              <Route
                path="/user/:login"
                render={props => (
                  <SingleUser
                    user={user}
                    repo={repo}
                    getUser={getUser}
                    getUserRepo={getUserRepo}
                    isLoading={isLoading}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
