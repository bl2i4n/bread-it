import {
     POSTS_CREATE,
     POSTS_UPDATE,
     POSTS_DELETE,
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
           return state;
       case POSTS_DELETE:
           return state;
       case POSTS_SORT:
           return Object.assign({}, state, {
               order: data.property
           });
       default:
           return state;
   }
}
