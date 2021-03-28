import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { users, searchUsers, clearUsers } = githubContext;
  const { handleAlert } = alertContext;

  const [text, setText] = useState('');

  const handleInput = e => {
    setText(e.target.value);

    handleAlert(null, 'clearAlert');
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (text === '') {
      handleAlert('please type something...', 'light');
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
      {users.length > 0 && (
        <button className="btn btn-light btn-block" onClick={clearUsers}>
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
