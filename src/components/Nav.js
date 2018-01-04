import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import CategoryList from './components/CategoryList';
import {fetchPosts} from '../utils/readableAPI';
import {postsSet} from '../state/posts/actions';

class NavBar extends Component {
  getHomePosts = () => {
    const {dispatch} = this.props;
    fetchPosts().then((posts) => {
      dispatch(postsSet(posts));
    });
  }
  
  render() {
    const {dispatch, categories} = this.props;
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
