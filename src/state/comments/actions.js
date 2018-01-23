import {
  sendScoreUpdate,
  sendNewComment
} from '../../utils/readableAPI';
import {uuid} from '../../utils/formatters';

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

 export const commentsSort = (property, direction = 'desc') => {
     if (propList.indexOf(property) === -1) {
         return {};
     }
     return {
         type: COMMENTS_SORT,
         data: {
             property,
             direction
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

export const commentsNew = (data) => {
  return (dispatch) => {
   const timestamp = Date.now();
   const id = uuid();
   const comment = Object.assign({}, data, {timestamp, id});
   sendNewComment(comment);
   dispatch({
      type: COMMENTS_CREATE,
      data: {
        comment
      }
   })

  }
};
