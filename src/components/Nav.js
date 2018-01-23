import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import CategoryList from './CategoryList';
import {fetchPosts} from '../utils/readableAPI';
import {postsSet} from '../state/posts/actions';

class NavBar extends Component {
  getHomePosts = () => {
    const {dispatch} = this.props;
    fetchPosts().then((posts) => {
      dispatch(postsSet(posts));
    });
  };

  render() {
    const {dispatch, categories} = this.props;
    return (
      <nav id="navbar">
        <div className="homeBtn">
          <Link to="/" onClick={() => this.getHomePosts()}>
            Home
          </Link>
        </div>
        <CategoryList
          categories={categories}
          dispatch={dispatch}
        />
      </nav>
    );
  }

}

export default NavBar;
