import React, {Component} from 'react';
import MdAdd from 'react-icons/lib/md/add';

class ActionButton extends Component {
  render() {
    const {onClick} = this.props;
    return (
      <div className="action-button">
        <MdAdd onClick={onClick}/>
      </div>
    )
  }

}

export default ActionButton;
