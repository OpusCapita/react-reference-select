import PropTypes from 'prop-types';
import React, { Component } from 'react';

const ASC_ORDER = 'asc';
const DESC_ORDER = 'desc';

/**
 * Sortable columns
 *
 * @author Dmitry Divin
 */
class SortableColumn extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    /**
     * Property name
     */
    test: PropTypes.string.isRequired,
    order: PropTypes.string,
    defaultOrder: PropTypes.string,
    sort: PropTypes.string,
    onSort: PropTypes.func.isRequired
  };

  static defaultProps = {
    defaultOrder: ASC_ORDER
  };

  onSort(event) {
    event.preventDefault();

    const { sort, test, defaultOrder, onSort } = this.props;
    let order = this.props.order;

    if (order && sort === test) {
      order = order === ASC_ORDER ? DESC_ORDER : defaultOrder;
    } else {
      order = defaultOrder;
    }

    onSort(this.props.test, order);
  }

  render() {
    const { sort, test, title, order, defaultOrder } = this.props;

    let icon = null;
    if (sort === test) {
      const currentOrder = order || defaultOrder;
      if (currentOrder === ASC_ORDER) {
        icon = (<span className="glyphicon glyphicon-arrow-up"/>);
      } else {
        icon = (<span className="glyphicon glyphicon-arrow-down"/>);
      }
    }

    return (
      <a onClick={this.onSort.bind(this)} style={{ cursor: 'pointer' }} title={title}>
        {title}
        <small>{icon}</small>
      </a>
    );
  }
}

export default SortableColumn;
