import React, {Component} from 'react';
import {postsNew} from '../state/posts/actions';

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const {dispatch} = this.props;
    if(!this.title.value) {
      alert('Title field cannot be empty');
      return;
    } else if(!this.author.value) {
      alert('Author field cannot be empty');
      return;
    } else if(!this.category.value) {
      alert('Category field cannot be empty');
      return
    } else if(!this.body.value) {
      alert('Body field cannot be empty');
      return;
    }
    const post = {
      title: this.title.value,
      author: this.author.value,
      category: this.category.value,
      body: this.body.value,
    }
    dispatch(postsNew(post));
  };

    render() {
       const { post, dispatch, categories } = this.props;
       const title = post ? post.title : '';
       const author = post ? post.author: '';
       const body = post ? post.body : '';
       const category = post ? post.category : '';
       return (
       <div className="container">
         <form id="post-form" className="post-form" onSubmit={this.handleSubmit}>
           <label className="form-label">
               <div className="form-label-text">
                   Title
               </div>
               <input
                   className="form-item"
                   id="title"
                   name="title"
                   type="text"
                   defaultValue={title}
                   ref={(input) => this.title = input}
               />
           </label>
           <label className="form-label">
               <div className="form-label-text">
                   Author
               </div>
               <input
                   className="form-item"
                   id="author"
                   name="author"
                   type="text"
                   defaultValue={author}
                   ref={(input) => this.author = input}
               />
           </label>
           <label className="form-label">
               <div className="form-label-text">
                   Body
               </div>
               <textarea
                   form="post-form"
                   className="form-item"
                   id="body"
                   name="body"
                   type="text"
                   defaultValue={body}
                   ref={(input) => this.body = input}
               ></textarea>
           </label>
           <label className="form-label">
               <div className="form-label-text">
                   Category
               </div>
               <select
                   className="form-item"
                   id="category"
                   name="category"
                   type="select"
                   defaultValue={category}
                   ref={(input) => this.category = input}
               >
                   {categories.map(cat => {
                       return (
                           <option key={cat.name}>
                               {cat.name}
                           </option>
                       );
                   })}
               </select>
           </label>
           <input type="submit" value="Submit" className="form-submit-button" />
         </form>
       </div>
       );
   }
}

export default PostForm;
