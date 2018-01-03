import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class NavBar extends Component {
  getHomePosts = () => {
    const {dispatch} = this.props;
    fetchPosts().then((posts) => {
      dispatch(postsSet(posts));
    });
  }
  render() {
    cons {dispatch, categories} = this.props;
    return (
      <nav id="navbar">
        <Link to="/" onClick={() => this.getHomePosts()}>
          Home
        </Link>

      </nav>
    );
  }

}

export default NavBar;
