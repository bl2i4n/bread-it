import React, {Component} from 'react';
import MdArrowUpward from 'react-icons/lib/md/arrow-upward';
import MdArrowDownward from 'react-icons/lib/md/arrow-downward';
import {commentsVote} from '../state/comments/actions';
import {postsVote} from '../state/posts/actions';

class Voter extends Component {
  sendVote = (dir) => {
    const {dispatch, id, type} = this.props;

    if (type === 'comment') {
      dispatch(commentsVote(id, dir));
    } else {
      dispatch(postsVote(id, dir));
    }
  }

  render(){
    const {score} = this.props;
    return (
      <div className="voting">
        <MdArrowUpward onClick={() => {this.sendVote('upVote')}}/>
          <div className="score-display">
            {score}
          </div>
        <MdArrowDownward onClick={() => {this.sendVote('downVote')}}/>
      </div>
    );

  }

}

export default Voter;
