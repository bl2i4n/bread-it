import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PostListItem extends Component {
  render(){
    const {post} = this.props;
    return (
      <div>
        <Link to={"/" + post.category + "/" + post.id}>
          {post.title}
        </Link>
      </div>
    );

  }
}

export default PostListItem;
