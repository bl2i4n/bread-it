import {
     POSTS_CREATE,
     POSTS_UPDATE,
     POSTS_SORT,
     POSTS_SET
} from './constants';

const defaultState = {
   order: 'voteScore',
   items: []
};

export default (state = defaultState, action) => {
   const { type, data } = action;

   switch(type) {
       case POSTS_SET:
           return Object.assign({}, state, {
               items: data.posts
           });
       case POSTS_CREATE:
           return state;
       case POSTS_UPDATE:
           return Object.assign({}, state, {
             items: state.items.reduce((memo, curVal) => {
               if (data.id === curVal.id) {
                 memo.push(Object.assign({}, curVal, data));
               } else {
                 memo.push(curVal);
               }
               return memo;
             }, [])
           });
       case POSTS_SORT:
           return Object.assign({}, state, {
               order: data.property
           });
       default:
           return state;
   }
}
