import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Search extends Component {
  state = {
    text: '',
  };

  static propTypes = {
    searchUsers: PropTypes.func.isRequired, // 快捷鍵 ptfr
    clearUsers: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
  };

  setText = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.props.setAlert(null, 'clearAlert');
  };

  onSubmit = async e => {
    e.preventDefault();
    if (this.state.text === '') {
      this.props.setAlert('please type something...', 'light');
    } else {
      this.props.searchUsers(this.state.text);
      this.setState({ text: '' });
    }
  };

  render() {
    const { showClearBtn, clearUsers } = this.props; // 快捷鍵 cp
    const { text } = this.state; //快捷鍵cs

    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={text}
            onChange={this.setText}
            autoComplete="off"
          />

          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
        {showClearBtn && (
          <button className="btn btn-light btn-block" onClick={clearUsers}>
            Clear
          </button>
        )}
      </div>
    );
  }
}
