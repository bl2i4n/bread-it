import React, {Component} from 'react';
import PostComments from './PostComments';
import {Link} from 'react-router-dom';
import {humanDateFromTimestamp} from '../utils/formatters';
import Voting from "./Voting";
import ActionButton from "./ActionButton";
import SortBy from "./SortBy";
import {fetchPostByID} from "../utils/readableAPI";
import {postsSet} from "../state/posts/actions";

class PostDetail extends Component {

  componentDidMount() {
     const { post, dispatch, match } = this.props;
     if (post) {
       return;
     }
     fetchPostByID(match.params.id).then(post => {
       dispatch(postsSet([post]));
     });
   }
   render() {
     const { dispatch, post, comments } = this.props;
     if (!post) {
       return null;
      }

     return (
       <div className="container">
         <div className="post-info-container">
           <div className="title-vote">
             <Voting
               score={post.voteScore}
               id={post.id}
               dispatch={dispatch}
               type="post"
             />
             <h1>{post.title}</h1>
           </div>
           <span>By {post.author}</span>
           <span> on {humanDateFromTimestamp(post.timestamp)}</span>
           <span>
             {" "}
             in <Link to={"/" + post.category}>{post.category}</Link>
           </span>
         </div>
         <div className="post-body">
           <p>{post.body}</p>
         </div>
         <h4>Comments:</h4>
         <SortBy type="comments" dispatch={dispatch} />
         <PostComments
           postId={post.id}
           comments={comments}
           dispatch={dispatch}
         />
         <ActionButton destination={`/posts/${post.id}/comment`} />
       </div>
     );
   }
}

export default PostDetail;
