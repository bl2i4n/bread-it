import {
   COMMENTS_SET,
   COMMENTS_CREATE,
   COMMENTS_UPDATE,
   COMMENTS_SORT
} from './constants';

const defaultState = {
   order: 'voteScore',
   items: []
};

export default (state = defaultState, action) => {
   const { type, data } = action;

   switch(type) {
       case COMMENTS_SET:
           return Object.assign({}, state, {
               items: data.comments
           });
       case COMMENTS_CREATE:
           return state;
       case COMMENTS_UPDATE:
           return Object.assign({}, state, {
             items: state.items.reduce(memo, curVal) => {
               if (data.id === curVal.id) {
                 memo.push(Object.assign({}, curVal, data));
               } else {
                 memo.push(curVal);
               }
               return memo;
             }, [])
           });
       case COMMENTS_SORT:
           return state;
       default:
           return state;
   }
}
