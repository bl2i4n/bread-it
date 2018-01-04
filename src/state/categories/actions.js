import {CATEGORIES_SET} from './constants';

export const categoriesSet = (categories) => {
  return {
    type: CATEGORIES_SET,
    data: {
      categories
    }
  }
};
