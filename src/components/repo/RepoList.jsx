import PropTypes from 'prop-types';

import RepoItem from './RepoItem';

const RepoList = ({ repo }) => {
  return repo.map(el => <RepoItem key={el.id} repo={el} />);
};

RepoList.propTypes = {
  repo: PropTypes.array.isRequired,
};

export default RepoList;
