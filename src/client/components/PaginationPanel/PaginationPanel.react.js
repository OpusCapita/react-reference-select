import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/lib/Pagination';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import translations from './i18n';

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
    onPaginate: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    max: 2
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      pageNumber: ''
    };
  }

  componentWillMount() {
    this.context.i18n.register('PaginationPanel', translations);
  }

  onSelect(pageNumber) {
    const radix = 10;
    let page = parseInt(pageNumber, radix);
    if (!page || page < 0 || page !== Number(pageNumber)) {
      this.setState({ pageNumber: '' });
      return;
    }
    const { count, max } = this.props;
    let maxPage = Math.round(Math.ceil(count / max));
    if (page > maxPage) {
      page = maxPage
    }
    this.props.onPaginate((page - 1) * max);
    this.setState({ pageNumber: '' })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSelect(this.state.pageNumber);
    }
  };

  renderPageButtons(activePage, items, maxButtons, boundaryLinks, ellipsis, buttonProps) {
    const pageButtons = [];

    let startPage;
    let endPage;

    if (maxButtons && maxButtons < items) {
      startPage = Math.max(
        Math.min(
          activePage - Math.floor(maxButtons / 2, 10),
          items - maxButtons + 1,
        ),
        1,
      );
      endPage = startPage + maxButtons - 1;
    } else {
      startPage = 1;
      endPage = items;
    }

    for (let page = startPage; page <= endPage; ++page) {
      pageButtons.push(
        <Pagination.Item
          {...buttonProps}
          key={page}
          eventKey={page}
          active={page === activePage}
          onClick={() => this.onSelect(page)}
        >
          {page}
        </Pagination.Item>,
      );
    }

    if (ellipsis && boundaryLinks && startPage > 1) {
      if (startPage > 2) {
        pageButtons.unshift(
          <Pagination.Ellipsis key="ellipsisFirst" disabled={true}>
            <span aria-label="More">
              {ellipsis === true ? '\u2026' : ellipsis}
            </span>
          </Pagination.Ellipsis>,
        );
      }

      pageButtons.unshift(
        <Pagination.Item
          {...buttonProps}
          key={1}
          eventKey={1}
          active={false}
          onClick={() => this.onSelect(1)}
        >
          1
        </Pagination.Item>,
      );
    }

    if (ellipsis && endPage < items) {
      if (!boundaryLinks || endPage < items - 1) {
        pageButtons.push(
          <Pagination.Ellipsis key="ellipsis" disabled={true}>
            <span aria-label="More">
              {ellipsis === true ? '\u2026' : ellipsis}
            </span>
          </Pagination.Ellipsis>,
        );
      }

      if (boundaryLinks) {
        pageButtons.push(
          <Pagination.Item
            {...buttonProps}
            key={items}
            eventKey={items}
            active={false}
            onClick={() => this.onSelect(items)}
          >
            {items}
          </Pagination.Item>,
        );
      }
    }

    return pageButtons;
  }

  render() {
    const { count, max, offset } = this.props;

    if (max === -1 || count === 0 || count <= max) {
      return null
    }

    const items = Math.ceil(count / max);
    const activePage = offset > 0 ? (offset / max + 1) : 1;

    return (
      <div>
        <div className="pull-left" style={{ height: '34px' }}>
          <Pagination>
            <li onClick={() => (activePage > 1) ? this.onSelect(activePage - 1) : null}>
              <a role="button" href="#">{PREV_BUTTON}</a>
            </li>
            {
              this.renderPageButtons(
                activePage,
                items,
                3,
                true,
                true
              )
            }
            <li onClick={() => (activePage < items) ? this.onSelect(activePage + 1) : null}>
              <a role="button" href="#">{NEXT_BUTTON}</a>
            </li>
          </Pagination>
        </div>
        <div className="pull-left">
          <FormControl
            type="text"
            className="form-control"
            style={{ width: '50px', textAlign: 'center' }}
            onChange={(e) => { this.setState({ pageNumber: e.target.value }) }}
            onKeyPress={this.handleKeyPress}
            value={this.state.pageNumber}
          />
        </div>
        <div className="pull-left">
          <Button className="btn btn-default" onClick={() => { this.onSelect(this.state.pageNumber) }}>
            {this.context.i18n.getMessage('common.PaginationPanel.goToPage')}
          </Button>
        </div>
      </div>
    );
  }
}
