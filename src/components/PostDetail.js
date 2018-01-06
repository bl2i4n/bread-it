import React, {Component} from 'react';
import PostComments from './PostComments';
import {Link} from 'react-router-dom';
import {humanDateFromTimestamp} from '../utils/formatters';

class PostDetail extends Component {
  render(){
    const {dispatch, post, comments} = this.props;
    if(!post) {
      return null;
    }

    return (
      <div className="container">
        <h1>{post.title}</h1>
        <span>By {post.author}</span>
        <span> on {humanDateFromTimestamp}(post.timestamp)</span>
        <span> in <Link to={'/' + post.category}>{post.category}</Link></span>
        <p>{post.body}</p>
        <PostComments
          postId={post.id}
          comments={comments}
          dispatch={dispatch}
        />
      </div>
    );
  }
}

export default PostDetail;
