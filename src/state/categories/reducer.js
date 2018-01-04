import {
  CATEGORIES_SET
} from './constants';

const defaultState = [];

export default (state = defaultState, action) => {
  const {type, data} = action;

  switch(type) {
    case CATEGORIES_SET:
      return data.categories;
    default:
      return state;
  }
}
