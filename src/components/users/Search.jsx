import { useState } from 'react';

import PropTypes from 'prop-types';

const Search = ({ showClearBtn, clearUsers, setAlert, searchUsers }) => {
  const [text, setText] = useState('');

  const handleInput = e => {
    setText(e.target.value);

    setAlert(null, 'clearAlert');
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (text === '') {
      setAlert('please type something...', 'light');
    } else {
      searchUsers(text);
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search Users..."
          value={text}
          onChange={handleInput}
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
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired, // 快捷鍵 ptfr
  clearUsers: PropTypes.func.isRequired,
  showClearBtn: PropTypes.bool.isRequired,
};

export default Search;
