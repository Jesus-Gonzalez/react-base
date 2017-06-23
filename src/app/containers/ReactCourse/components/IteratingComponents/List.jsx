import { PropTypes } from 'prop-types';
import React, { Component } from 'react';

import Item from './Item';

export class List extends Component {

  constructor (props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          name: 'First item',
        },
        {
          id: 2,
          name: 'Second item',
        },
        {
          id: 3,
          name: 'Third item',
        },
      ]};
  }

  render () {

    const items = this.state.items;
    
    const itemList = items.map(item => (
      <Item
      key={ item.id }
      { ...item }
      />
    ))

    return (
      <div>
      { itemList }
      </div>
    );
  }
}

export default List;
