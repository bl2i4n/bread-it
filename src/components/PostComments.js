import React, {Component} from 'react';
import CommentDetail from './CommentDetail';
import {fetchPostComments} from '../utils/readableAPI';
import {commentsSet} from '../state/comments/actions';
import EditDelete from './EditDelete';

class PostComments extends Component {
  componentDidMount(){
    const {post, dispatch} = this.props;
    fetchPostComments(post.id).then((res) => {
      dispatch(commentsSet(res));
    });
  }

  render(){
    const {comments, dispatch, post} = this.props;
    return (
      <ul className="list-container">
        {comments.map(comment => {
          return (
            <li key={comment.id}>
              <CommentDetail
                comment={comment}
                dispatch={dispatch}
              />
              <EditDelete
                type="comment"
                id={comment.id}
                post={post}
                dispatch={dispatch}
              />
            </li>
          )
        })}
      </ul>
    );
  }
}

export default PostComments;
