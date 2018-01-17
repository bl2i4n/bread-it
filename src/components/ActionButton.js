import React, {Component} from 'react';
import MdAdd from 'react-icons/lib/md/add';
import {Link} from 'react-router-dom';

class ActionButton extends Component {
  render() {
    const {destination} = this.props;
    return (
      <div className="action-button">
        <Link to={destination}>
          <MdAdd />
        </Link>
      </div>
    );
  }
}

export default ActionButton;
