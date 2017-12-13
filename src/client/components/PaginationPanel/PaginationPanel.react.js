import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Pagination from 'react-bootstrap/lib/Pagination';
// import translations from './i18n';
// import './PaginationPanel.less';

const NEXT_BUTTON = (<span className="glyphicon glyphicon-forward" />);
const PREV_BUTTON = (<span className="glyphicon glyphicon-backward" />);

/**
 * Pagination panel
 *
 * @author Dmitry Divin
 */
export default class PaginationPanel extends Component {
  static propTypes = {
    /**
     * The number of records to display per page, default 10.
     */
    max: PropTypes.number,

    /**
     * The count number of results to paginate
     */
    count: PropTypes.number.isRequired,

    /**
     * The offset navigate
     */
    offset: PropTypes.number.isRequired,

    /**
     * Pagination callback
     */
    onPaginate: PropTypes.func.isRequired,

    /**
     * On select page
     */
    style: PropTypes.object
  };

  static defaultProps = {
    max: 10,
    style: {}
  };

  onSelect(eventKey) {
    const max = this.props.max;
    const currentPage = eventKey;

    this.props.onPaginate((currentPage - 1) * max);
  }

  render() {
    const count = this.props.count;

    if (count > 0) {
      const max = this.props.max;
      const offset = this.props.offset;
      const items = Math.ceil(count / max);
      const activePage = offset > 0 ? (offset / max + 1) : 1;

      return (
        <Pagination
          items={items}
          activePage={activePage}
          maxButtons={3}
          onSelect={this.onSelect.bind(this)}
          prev={PREV_BUTTON}
          next={NEXT_BUTTON}
          first={false}
          last={false}
          ellipsis={true}
          boundaryLinks={true}
          style={this.props.style}
        />
      );
    }
    return null
  }
}
