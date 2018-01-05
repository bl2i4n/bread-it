import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {fetchCategoryPosts} from '../utils/readableAPI';
import {postsSet} from '../state/posts/actions';

class CategoryListItem extends Component {

  getCategoryPosts = () => {
    const {dispatch, category} = this.props;
    fetchCategoryPosts(category.path).then(
      (posts) => {
        dispatch(postsSet(posts));
      }
    );
  }

  render(){

    const {category} = this.props;
    return (
      <div className="category">
        <Link
          to={"/" + category.path}
          onClick={ () => this.getCategoryPosts() }
        >
          {category.name}
        </Link>
      </div>
    );
  }
}

export default CategoryListItem;
