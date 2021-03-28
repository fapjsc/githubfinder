import { useContext } from 'react';

import UserItem from './UserItem';
import GithubContext from '../../context/github/GithubContext';

import { v4 as uuidv4 } from 'uuid';

import Spinner from '../ui/Spinner';

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users, error } = githubContext;

  if (loading) {
    return <Spinner />;
  } else if (error !== '') {
    return <h2>{error}</h2>;
  } else {
    return (
      <div style={userStyle}>
        {users.map(user => (
          <UserItem key={uuidv4()} user={user} />
        ))}
      </div>
    );
  }
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridColumnGap: '1rem',
};

export default Users;
