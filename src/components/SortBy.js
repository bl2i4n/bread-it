import React, { Component } from "react";
import { postsSort } from "../state/posts/actions";
import { commentsSort } from "../state/comments/actions";

class SortBy extends Component {
 updateOrder = () => {
   const { dispatch, type } = this.props;
   if (type === "posts") {
     dispatch(postsSort(this.orderBy.value, this.orderDir.value));
   } else if (type === "comments") {
     dispatch(commentsSort(this.orderBy.value, this.orderDir.value));
   }
 };

 render() {
   return (
     <div className="sort-by-container">
       <label className="inline-form-label">
         <div className="form-label-text">Order:</div>
         <select
           className="form-item"
           id="order-select-prop"
           name="post-order-prop"
           type="select"
           defaultValue="voteScore"
           ref={input => (this.orderBy = input)}
           onChange={this.updateOrder}
         >
           <option value="voteScore">Score</option>
           <option value="timestamp">Time</option>
         </select>
         <select
           className="form-item"
           id="order-select-dir"
           name="post-order-dir"
           type="select"
           defaultValue="desc"
           ref={input => (this.orderDir = input)}
           onChange={this.updateOrder}
         >
           <option value="asc">Ascending</option>
           <option value="desc">Descending</option>
         </select>
       </label>
     </div>
   );
 }
}

export default SortBy;
