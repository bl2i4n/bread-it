import React, {Component} from 'react';
import PostListItem from './PostListItem';
import ActionButton from './ActionButton';

class PostList extends Component {
  render() {
    const {posts, dispatch, newPost} = this.props;
    return (
      <div>
       <div className="container">
         <ul className="list-container">
           {posts.map((post) => {
             return (
               <li key={post.id}>
                 <PostListItem
                     post={post}
                     dispatch={dispatch}
                 />
               </li>
             )
           })}
         </ul>
       </div>
       <ActionButton onClick={() => newPost()}/>
      </div>
    );
  }

}

export default PostList;
