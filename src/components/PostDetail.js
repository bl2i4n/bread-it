import React, {Component} from 'react';
import PostComments from './PostComments';
import {Link} from 'react-router-dom';
import {humanDateFromTimestamp} from '../utils/formatters';
import Voting from "./Voting";
import ActionButton from "./ActionButton";
import SortBy from "./SortBy";
import {fetchPostByID} from "../utils/readableAPI";
import {postsSet} from "../state/posts/actions";
import EditDelete from './EditDelete';


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
         <EditDelete type="post" id={post.id} post={post} dispatch={dispatch} />
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
       <PostComments post={post} comments={comments} dispatch={dispatch} />
       <ActionButton destination={`/${post.category}/${post.id}/comment`} />
       </div>
     );
   }
}

export default PostDetail;
