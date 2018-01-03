import React, {Component} from 'react';

class PostComments extends Component {
  render(){
    const {comments} = this.props;
    return (
      <div>
        {comments.map((comment) => {
          return (
            <Comments comment={comment} />
          )
        })}
      </div>
    );
  };
}

export default PostComments;
