import React, {Component} from "react";
import MdEdit from "react-icons/lib/md/edit";
import MdDelete from "react-icons/lib/md/delete";
import {withRouter} from "react-router";
import {postsDelete} from "../state/posts/actions";
import {commentsDelete} from "../state/comments/actions";

class EditDelete extends Component {

   handleEdit = () => {
     console.log(this);
   };

   handleDelete = () => {
     const { id, type, dispatch, post, history } = this.props;

     if (type === 'post') {
       dispatch(postsDelete(id));
       history.push(`/${post.category}`);
     } else if (type === 'comment') {
       dispatch(commentsDelete(id));
       history.push(`/${post.category}/${post.id}`);
     }
   };

   render() {
     return (
       <div className="edit-delete-container">
         <MdEdit onClick={this.handleEdit} />
         <MdDelete onClick={this.handleDelete} />
       </div>
     );
   }
  }

export default withRouter(EditDelete);
