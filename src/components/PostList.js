import React, {Component} from 'react';
import PostListItem from './PostListItem';
import ActionButton from './ActionButton';
import SortBy from "./SortBy";
import {fetchCategoryPosts, fetchPosts} from "../utils/readableAPI";
import {postsSet} from "../state/posts/actions";


class PostList extends Component {
  componentDidMount() {
    const {posts, match, dispatch} = this.props;
    if (posts.length !== 0) {
      return;
    }
    if(match.params.category) {
      fetchCategoryPosts(match.params.category).then(posts => {
          dispatch(postsSet(posts));
        });
    } else {
      fetchPosts().then(posts => {
        dispatch(postsSet(posts));
      });
    }
  }

  render (){
    const { posts, dispatch } = this.props;
     return (
       <div>
         <SortBy type="posts" dispatch={dispatch} />
         <div className="container">
           <ul className="list-container">
             {posts.map(post => {
               return (
                 <li key={post.id}>
                   <PostListItem post={post} dispatch={dispatch} />
                 </li>
               );
             })}
           </ul>
         </div>
         <ActionButton destination="/posts/new" />
       </div>
     );

  }

}

export default PostList;
