import React, {Component} from 'react';
import PostComments from './PostComments';

class PostDetail extends Component {
  render(){
    const {dispatch, post, comments} = this.props;
    if(!post) {
      return null;
    }

    return (
      <div className="container">
        <h1>{post.title}</h1>
        <h2>By {post.author}</h2>
        <h3>On {post.timestamp}</h3>
        <h3>In {post.category}</h3>
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
