import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CategoryListItem extends Component {
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
