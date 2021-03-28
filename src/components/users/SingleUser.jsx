import { Fragment, useEffect, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import { Link } from 'react-router-dom';

import RepoList from '../repo/RepoList';
import Spinner from '../ui/Spinner';

const SingleUser = ({ match }) => {
  const githubContext = useContext(GithubContext);
  const { user, getUser, loading, repo, getUserRepo } = githubContext;

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepo(match.params.login);
    // eslint-disable-next-line
  }, []);

  if (!loading) {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        Hireable:{' '}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        {/* Content */}
        <div className="card grid-2 ">
          {/* Avatar */}
          <div className="all-center ">
            <img
              src={avatar_url}
              alt=""
              className="round-img"
              style={{ width: '150px' }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>

          {/* Detail */}
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            {/* Github LInk */}
            <a href={html_url} className="btn btn-dark my-1">
              View Github Profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>

              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Website:</strong>
                    {blog}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        {/* Followers */}
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-danger">Public Repos: {public_repos}</div>
          <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
        <RepoList repo={repo} />
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

SingleUser.propTypes = {};

export default SingleUser;
