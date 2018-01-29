import {
  sendScoreUpdate,
  sendNewPost
} from '../../utils/readableAPI';

import {uuid} from '../../utils/formatters';

import {
     POSTS_CREATE,
     POSTS_UPDATE,
     POSTS_SORT,
     POSTS_SET
 } from './constants';

 const propList = [
     'id',
     'timestamp',
     'title',
     'body',
     'author',
     'category',
     'voteScore',
     'deleted'
 ];

 export const postsSort = (property, direction = 'desc') => {
     if (propList.indexOf(property) === -1) {
         return {};
     }
     return {
         type: POSTS_SORT,
         data: {
             property,
             direction
         }
     }
 };

 export const postsSet = (posts) => {
     return {
         type: POSTS_SET,
         data: {
             posts
         }
     }
 }

 export const postsVote = (id, direction) => {
   return (dispatch, getState) => {
     const {items} = getState().posts;
     sendScoreUpdate(id, 'posts', direction);
     let score = items.find((item) => {
       return item.id === id;
     }).voteScore;

     if (direction === 'upVote') {
       score = 1;
     } else {
       score -= 1;
     }

     dispatch({
       type: POSTS_UPDATE,
       data: {
         id,
         voteScore: score
       }
     });
   };

 };

 export const postsNew = (data) => {
   return (dispatch) => {
     const { title, author, body, category} = data;
     const timestamp = Date.now();
     const id = uuid();
     const post = Object.assign({}, data, {timestamp, id});
     sendNewPost(post);
     dispatch({
       type: POSTS_CREATE,
       data: {
         post
       }
     });
   };
 };

 export const postsDelete = id => {
   return dispatch => {
     sendDeletePost(id);
     dispatch({
       type: POSTS_UPDATE,
       data: {
         id,
         deleted: true
       }
     });
   };
 };
