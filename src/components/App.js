import React, { Component } from "react";
 import { connect } from "react-redux";
 import { Route, withRouter } from "react-router-dom";

 import PostList from "./PostList";
 import NavBar from "./Nav";
 import PostDetail from "./PostDetail";
 import PostForm from "./PostForm";
 import CommentForm from "./CommentForm";

 import { fetchCategories } from "../utils/readableAPI";

 import { categoriesSet } from "../state/categories/actions";

 class App extends Component {
   componentDidMount() {
     const { dispatch } = this.props;
     fetchCategories().then(categories => {
       dispatch(categoriesSet(categories));
     });
   }

   findComment = id => {
     const {comments} = this.props;
     return comments.items.find(comment => comment.id === id);
   };

   findPost = id => {
     const { posts } = this.props;
     return posts.items.find(post => post.id === id);
   };

   checkCategory = name => {
     const { categories } = this.props;
     if (
       categories.find(cat => {
         return cat.path === name;
       })
     ) {
       return true;
     }
     return false;
   };

   render() {
     const { dispatch, posts, categories, comments } = this.props;
     return (
       <div className="App">
         <NavBar dispatch={dispatch} categories={categories} />
         <Route
           exact
           path="/"
           render={({ match }) => {
             return (
               <PostList posts={posts.items} dispatch={dispatch} match={match} />
             );
           }}
         />
         <Route
           exact
           path="/posts/new"
           render={({ match }) => {
             return (
               <PostForm
                 dispatch={dispatch}
                 categories={categories}
                 match={match}
               />
             );
            }}
         />
         <Route
           exact
           path="/:category"
           render={({ match }) => {
             if (!this.checkCategory(match.params.category)) {
               return null;
             }
             return (
               <PostList posts={posts.items} dispatch={dispatch} match={match} />
             );
            }}
          />
          <Route
            exact
            path="/:category/:id"
            render={({ match }) => {
              if (!this.checkCategory(match.params.category)) {
               return null;
             }
             const { id } = match.params;
             const post = this.findPost(id);
             return (
               <PostDetail
                 post={post}
                 comments={comments.items}
                 dispatch={dispatch}
                 match={match}
               />
             );
            }}
          />
          <Route
            exact
            path="/:category/:postId/comment"
            render={({ match }) => {
              const { id } = match.params;
              const post = this.findPost(id);
             return <CommentForm post={post} dispatch={dispatch} />;
           }}
         />
       <Route
         exact
         path="/posts/edit/:id"
         render={({match}) => {
           const {id} = match.params;
           const post = this.findPost(id);
           return (
             <PostForm
               post={post}
               dispatch={dispatch}
               categories={categories}
               match={match}
             />
           );
         }}
         />
       <Route
        exact
        path="/:category/:postId/comment/:commentId"
        render={({ match }) => {
          const { commentId } = match.params;
          const comment = this.findComment(commentId);
          let post = null;
          if (comment) {
            post = this.findPost(comment.parentId);
          }
          return (
            <CommentForm post={post} dispatch={dispatch} comment={comment} />
       />
       </div>
     );
   }
 }

 const mapStateToProps = state => {
   const { posts, comments } = state;
   const sortedPosts = posts.items
     .sort((postA, postB) => {
       if (posts.orderDir === 'asc') {
         return postA[posts.orderBy] >= postB[posts.orderBy];
       }
       return postA[posts.orderBy] <= postB[posts.orderBy];
     })
     .filter(post => {
       return post.deleted !== true;
     });

   //Sort Comments and make sure that they nor their parent is deleted
   const sortedComments = comments.items
     .sort((commentA, commentB) => {
       if (comments.orderDir === 'asc') {
         return commentA[comments.orderBy] >= commentB[comments.orderBy];
       }
       return commentA[comments.orderBy] <= commentB[comments.orderBy];
     })
     .filter(comment => {
       return comment.deleted !== true && comment.parentDeleted !== true;
     });;

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
