import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';

import PostList from './PostList';
import NavBar from './Nav';
import PostDetail from './PostDetail';
import PostForm from './PostForm';
import CommentForm from './CommentForm';

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
    const {dispatch} = this.props;
    fetchCategories().then((categories) => {
      dispatch(categoriesSet(categories));
    });
  }

  findPost = id => {
    const {posts} = this.props;
    return posts.items.find(post => post.id === id);
  };

  checkCategory = name => {
    const {categories} = this.props;
      if (
        categories.find(cat => {
          return cat.path === name;
        })
      ) {
        return true;
      }
    return false;
  };

render(){
    const { dispatch, posts, categories, comments} = this.props;

    return(
      <div className="App">
        <NavBar dispatch={dispatch} categories={categories} />
        <Route
          exact
          path="/"
          render={({match}) => {
          return (
            <PostList posts={posts.item} dispatch={dispatch} match={match} />
            );
          }}
        />
        <Route
          exact
          path="/posts/new"
          render={() => {
            return <PostForm dispatch={dispatch} categories={categories} />;
          }}
        />
        <Route
          exact
          path="/:category"
          render={({match}) => {
            if(!this.checkCategory(match.params.category)){
              return null;
            }
            return (
              <PostList posts={posts.items} dispatch={dispatch} match={match} />
            );
          }}

        />
        <Route
          path="/:category/:id"
          render={({match}) => {
            if(!this.checkCategory(match.params.category)) {
              return null;
            }
            const {id} = match.params;
            const post = this.findPost(id);
            return (
              <PostDetail
                post={post}
                comments={comments.item}
                dispatch={dispatch}
                match={match}
              />
            );
          }}
          />
        <Route
          path="/posts/:id/comment"
          render={({match}) => {
            const {id} = match.params;
            const post = this.findPost(id);
            return <CommentForm post={post} dispatch={dispatch} />
          }}
        />
    </div>
    );
  }
}

const mapStateToProps = state => {
  const {posts, comments} = state;

  const sortedPosts = posts.items.sort((postA, postB) => {
    if (posts.orderDir === "asc") {
      return postA[posts.orderBy] >= postB[posts.orderBy];
    }
    return postA[posts.orderBy] <= postB[posts.orderBy];
  });

  const sortedComments = comments.items.sort((commentA, commentB) =>{
    if (comments.orderDir === "asc") {
      return commentA[comments.orderBy] >= commentB[comments.orderBy];
    }
    return commentA[comments.orderBy] <= commentB[comments.orderBy];
  });

  const newState = Object.assign({}, state, {
    posts: Object.assign({}, posts, {
      items: sortedPosts
    }),
    comments: Object.assign({}, comments, {
      items: sortedComments
    })
  });
  return newState;
};

export default withRouter(connect(mapStateToProps)(App));
