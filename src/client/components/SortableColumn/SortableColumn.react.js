import React, { Component, PropTypes } from 'react';

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

    let order = this.props.order;

    if (order) {
      order = order === ASC_ORDER ? DESC_ORDER : this.props.defaultOrder;
    } else {
      order = this.props.defaultOrder;
    }

    this.props.onSort(this.props.test, order);
  }

  render() {
    const sort = this.props.sort;
    const test = this.props.test;
    const title = this.props.title;

    let icon = null;
    if (sort === test) {
      let order = this.props.order || this.props.defaultOrder;
      if (order === ASC_ORDER) {
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
