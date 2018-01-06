import React, {Component} from 'react';
import CommentDetail from './CommentDetail';
import {fetchPostComments} from '../utils/readableAPI';
import {commentsSet} from '../state/comments/actions';

class PostComments extends Component {
  componentDidMount(){
    const {postId, dispatch} = this.props;
    fetchPostComments(postId).then((res) => {
      dispatch(commentsSet(res));
    });
  };

  render(){
    const {comments, dispatch} = this.props;
    return (
      <ul className="list-container">
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <CommentDetail
                comment={comment}
                dispatch={dispatch}
              />
            </li>
          )
        })}
      </ul>
    );
  };
}

export default PostComments;
