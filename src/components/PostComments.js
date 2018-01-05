import React, {Component} from 'react';
import CommentDetail from './CommentDetail';
import {fetchPostComments} from '../utils/readableAPI';
import {commentsSet} from '../state/comments/actions';

class PostComments extends Component {
  componentDidMount(){
    const {postId, dispatch} = this.props;
    fetchPostComments(postId).then((rest) => {
      dispatch(commentsSet(rest));
    });
  };

  render(){
    const {comments} = this.props;
    return (
      <div>
        {comments.map((comment) => {
          return (
            <CommentDetail comment={comment} />
          )
        })}
      </div>
    );
  };
}

export default PostComments;
