import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {Route, withRouter} from 'react-router-dom';


class App extends Component {

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
export default App;
