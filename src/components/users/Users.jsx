import UserItem from './UserItem';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../ui/Spinner';
import PropTypes from 'prop-types';

const Users = ({ users, isLoading, error }) => {
  if (isLoading) {
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

Users.propTypes = {
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default Users;
