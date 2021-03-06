import React, {Component} from "react";
import {commentsNew} from "../state/comments/actions";
import {withRouter} from "react-router";
import {fetchPostByID} from "../utils/readableAPI";
import {postsSet} from "../state/posts/actions";

class CommentForm extends Component {
  componentDidMount(){
    const {post, dispatch, match} = this.props;
    if (post) {
      return;
    }
    fetchPostByID(match.params.id).then(post => {
      dispatch(postsSet([post]));
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {dispatch, post, history} = this.props;

    if (!this.author.value) {
      alert("Author field cannot be empty");
      return;
    } else if (!this.body.value) {
      alert("Body field cannot be empty");
      return;
    }
    const comment = {
      author: this.author.value,
      body: this.body.value,
      parentId: post.id
    };
    dispatch(commentsNew(comment));
    history.push(history.location.pathname.replace("/comment", ""));
  };
  render() {
    const {comment} = this.props;
    const author = comment ? comment.author : "";
    const body = comment ? comment.body : "";
    return (
      <div className="container">
         <form
           id="comment-form"
           className="post-form"
           onSubmit={this.handleSubmit}
         >
           <label className="form-label">
             <div className="form-label-text">Author</div>
             <input
               className="form-item"
               id="author"
               name="author"
               type="text"
               defaultValue={author}
               ref={input => (this.author = input)}
             />
           </label>
           <label className="form-label">
             <div className="form-label-text">Body</div>
             <textarea
               form="post-form"
               className="form-item"
               id="body"
               name="body"
               type="text"
               defaultValue={body}
               ref={input => (this.body = input)}
             />
           </label>
           <input type="submit" value="Submit" className="form-submit-button" />
         </form>
       </div>
    );
  }

}

export default withRouter(CommentForm);
