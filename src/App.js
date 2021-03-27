import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './pages/About';

import NavBar from './components/layout/NavBar';
import Search from './components/users/Search';
import Users from './components/users/Users.jsx';
import SingleUser from './components/users/SingleUser';
import Alert from './components/ui/Alert.jsx';

import axios from 'axios';

import './App.css';

class App extends React.Component {
  state = {
    users: [],
    user: {},
    repo: [],
    isLoading: false,
    error: '',
    alert: null,
  };

  // search users
  searchUsers = async text => {
    this.setState({
      isLoading: true,
    });

    try {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        isLoading: false,
        users: res.data.items,
        error: '',
      });
    } catch (error) {
      this.setState({ isLoading: false, error: '找不到' });
    }
  };

  // get single user
  getUser = async username => {
    this.setState({
      isLoading: true,
    });

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        isLoading: false,
        user: res.data,
        error: '',
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  // get user repos
  getUserRepo = async username => {
    this.setState({
      isLoading: true,
    });

    try {
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        isLoading: false,
        repo: res.data,
        error: '',
      });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  // set alert and clear alert
  setAlert = (msg, type) => {
    if (type === 'clearAlert') {
      this.setState({ alert: null });
      return;
    }

    this.setState({
      alert: {
        msg,
        type,
      },
    });
  };

  // clear users from state
  clearUsers = () => this.setState({ users: [], isLoading: false });

  render() {
    const { users, user, repo, isLoading, error, alert } = this.state;

    return (
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
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClearBtn={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    getUserRepo={this.getUserRepo}
                    isLoading={isLoading}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
