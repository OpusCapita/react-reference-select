import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/lib/Pagination';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import translations from './i18n';
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
    onPaginate: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    max: 10
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
    let page = Number.parseInt(pageNumber, radix);
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

  render() {
    const count = this.props.count;
    const max = this.props.max;

    if (count > 0 && count > max) {
      const offset = this.props.offset;
      const items = Math.ceil(count / max);
      const activePage = offset > 0 ? (offset / max + 1) : 1;

      return (
        <div>
          <div className="pull-left">
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
              style={{ verticalAlign: 'middle' }}
            />
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
              {this.context.i18n.getMessage('PaginationPanel.goToPage')}
            </Button>
          </div>
        </div>
      );
    }
    return null
  }
}
