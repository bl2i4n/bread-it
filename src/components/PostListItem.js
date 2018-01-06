import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Voting from './Voting';
import {humanDateFromTimestamp} from '../utils/formatters'

class PostListItem extends Component {
  render(){
    const {post, dispatch} = this.props;
    return (
      <div className="list-item-container">
        <Voting
          id={post.id}
          type="post"
          score={post.voteScore}
          dispatch={dispatch}
        />
        <div className="list-item-detail">
          <p>{post.author} on {humanDateFromTimestamp(post.timestamp)}</p>
          <p>
            <Link to={'/' + post.category + '/' + post.id}>
              {post.title}
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default PostListItem;
