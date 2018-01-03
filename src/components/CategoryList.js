import React, {Component} from 'react';
import CategoryListItem from './CategoryListItem';

class CategoryList extends Component {
  render(){
    const {dispatch, categories} = this.props;
    return (
      <ul id="category-list">
        {categories.map((category) => {
          return (
            <li key={category.path}>
              <CategoryListItem
                category={category}
                dispatch={dispatch}
              />
            </li>
          )
        })}
      </ul>
    );
  }
}

export default CategoryList;
