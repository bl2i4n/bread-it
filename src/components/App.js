import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import PostList from './PostList';
import NavBar from './Nav';
import PostDetail from './PostDetail';

import {
  fetchCategories,
  fetchCategoryPosts,
  fetchPosts,
  fetchPostByID
} from '../utils/readableAPI';

import {categoriesSet} from '../state/categories/actions';
import {postsSet} from '../state/posts/actions';


class App extends Component {

  componentDidMount() {
    const {dispatch, location} = this.props;
    fetchCategories().then((categories) => {
      dispatch(categoriesSet(categories));
    });
    const locationPieces = location.pathname.split('/');
    if(locationPieces.length === 3) {
      fetchPostByID(locationPieces[2]).then((post) => {
        dispatch(postsSet[post]);
      });
    } else if (locationPieces.length === 2 && locationPieces[0] === locationPieces[1]) {
      fetchPosts().then((posts) => {
        dispatch(postsSet(posts));
      });
    } else {
      fetchCategoryPosts(locationPieces[1]).then((posts) => {
        dispatch(postsSet(posts));
      });
    }
  }

  findPost = (id) => {
    const {posts} = this.props;
    return posts.find((post) => post.id === id);
  };

render(){
    const { dispatch, posts, categories, comments} = this.props;

    return(
      <div className="App">
        <NavBar
          dispatch={dispatch}
          categories={categories}
        />
      <Route exact path="/" render={
          () => {
            return(
              <PostList
                posts={posts}
              />
            )
          }
      } />

    <Route exact path="/:category" render={
        () => {
          return (
            <PostList
              posts={posts}
            />
          )
        }
    } />

  <Route path="/:category/:id" render={
        ({match}) => {
          const post = this.findPost(match.params.id);
          return (
            <PostDetail
              post={post}
              comments={comments}
              dispatch={dispatch}
            />
          )
        }
    } />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {posts, comments} = state;
  const newState = Object.assign({}, state, {
    posts: posts.items.sort((postA, postB) => {
      return postA[posts.order] <= postB[posts.order];
    }),
    comments: comments.items.sort((commentA, commentB) => {
      return commentA[comments.order] <= commentB[comments.order];
    })
  });
  return newState;
};

export default withRouter(connect(mapStateToProps)(App));
