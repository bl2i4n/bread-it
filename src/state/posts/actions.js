import {sendScoreUpdate} from '../../utils/readableAPI';
import {
     POSTS_CREATE,
     POSTS_UPDATE,
     POSTS_DELETE,
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

 export const postsSort = (property) => {
     if (propList.indexOf(property) === -1) {
         return {};
     }
     return {
         type: POSTS_SORT,
         data: {
             property
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
       score += 1;
     } else {
       score -= 1;
     }

     dispatch({
       type: POSTS_UPDATE,
       data: {
         id,
         voteScore: score
       }
     })
   }

 };
