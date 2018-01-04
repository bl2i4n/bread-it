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
