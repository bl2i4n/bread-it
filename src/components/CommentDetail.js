import React, {Component} from 'react';
import Voting from './Voting';
import {humanDateFromTimestamp} from '../utils/formatters';


class CommentDetail extends Component {
  render() {
    const {comment, dispatch} = this.props;
    return (
      <div className="list-item-container">
        <Voting
          id={comment.id}
          type="comment"
          score={comment.voteScore}
          dispatch={dispatch}
        />
        <div className="list-item-detail">
          <p>{comment.author} at <time>{humanDateFromTimestamp(comment.timestamp)}</time></p>
          <p>{comment.body}</p>
        </div>
      </div>
    );
  }

}

export default CommentDetail;
