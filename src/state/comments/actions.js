import {sendScoreUpdate} from '../../utils/readableAPI';

import {
     COMMENTS_SET,
     COMMENTS_CREATE,
     COMMENTS_UPDATE,
     COMMENTS_SORT
 } from './constants';

 const propList = [
     'id',
     'parentId',
     'timestamp',
     'body',
     'author',
     'voteScore',
     'deleted',
     'parentDeleted'
 ];

 export const commentsSort = (property) => {
     if (propList.indexOf(property) === -1) {
         return {};
     }
     return {
         type: COMMENTS_SORT,
         data: {
             property
         }
     }
 };

 export const commentsSet = (comments) => {
     return {
         type: COMMENTS_SET,
         data: {
             comments
         }
     }
  }

  export const commentsVote = (id, direction) => {
    return (dispatch, getState) => {
      const {items} = getState().comments;
      sendScoreUpdate(id, 'comments', direction);
      let score = items.find((item) => {
        return item.id === id;
      }).voteScore;

      if (direction === 'upVote'){
        score += 1;
      } else {
        score -= 1;
      }

      dispatch({
        type: COMMENTS_UPDATE,
        data: {
          id,
          voteScore: score
        }
      })

    }

};
