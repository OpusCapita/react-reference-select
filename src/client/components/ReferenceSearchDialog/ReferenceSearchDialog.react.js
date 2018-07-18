import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clone from 'lodash/clone';
import find from 'lodash/find';
import reject from 'lodash/reject';
import get from 'lodash/get';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import ResultSizePanel from '../ResultSizePanel';
import PaginationPanel from '../PaginationPanel';
import SortableColumn from '../SortableColumn';
import translations from './i18n'
import ReferenceSearchDialogProps from '../ReferenceSearchDialogProps';
import './styles.less';

/**
 * Reference search dialog
 *
 * @author Dmitry Divin
 */
export default class ReferenceSearchDialog extends Component {

  static propTypes = {
    /**
     * Show search result popup
     */
    openDialog: PropTypes.bool.isRequired,

    /**
     * On search request handler, where
     *
     * @arg0.searchParams - search params form input fields
     * @arg0.max - max result size
     * @arg0.offset - paging offset
     * @arg0.sort - sort column name
     * @arg0.order - order of sort
     */
    referenceSearchAction: PropTypes.func.isRequired,
    /**
     * On close dialog
     */
    onCloseDialog: PropTypes.func.isRequired,
    /**
     * On selected items handler, where:
     *
     * @arg0 - list of selected items
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * Multiple selection items,
     * otherwise single
     */
    multiple: PropTypes.bool.isRequired,

    /**
     * Field that identifies the object (f.e. supplierId for suppliers)
     */
    objectIdentifier: PropTypes.string.isRequired,

    /**
     * Modal specific properties
     */
    modalSpecificProps: PropTypes.object,

    ...ReferenceSearchDialogProps,
    /**
     * Trim search parameters
     */
    trimSearchParameters: PropTypes.bool
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    modalSpecificProps: {},
    trimSearchParameters: true
  };

  constructor(...args) {
    super(...args);

    this.defaultDialogState = {
      selectedItems: [],
      selectedAll: false,
      searchParams: {},
      sort: '',
      order: '',
      offset: 0,
      max: 10,
      items: [],
      count: 0
    };

    this.state = {
      ...this.defaultDialogState
    };
  }

  componentWillMount() {
    this.context.i18n.register('ReferenceSearchDialog', translations);
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.doInitialSearch();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.openDialog !== this.props.openDialog) {
      this.setState(this.defaultDialogState);
    }

    if (!this.props.openDialog && nextProps.openDialog) {
      this.doInitialSearch();
    }
  }

  onChangeSearchParam = (name, value) => {
    const searchParams = { ...this.state.searchParams };
    if (value) {
      searchParams[name] = value;
      searchParams[`${name}_operator`] = 'startsWith';
    } else {
      delete searchParams[name];
      delete searchParams[`${name}_operator`];
    }
    this.setState({ searchParams });
  };

  doSearch(max, offset, sort, order, cb = (result) => { this.setState(result) }) {
    const dataRowParams = {
      max,
      offset
    };

    if (sort) {
      dataRowParams.sort = sort;
    }
    if (order) {
      dataRowParams.order = order;
    }
    let { searchParams } = this.state;
    const { trimSearchParameters } = this.props;
    if (trimSearchParameters) {
      // trim search params
      searchParams = Object.keys(searchParams).reduce((previousValue, currentValue) => {
        const parameterValue = searchParams[currentValue].trim();
        if (parameterValue) {
          return {
            ...previousValue,
            [currentValue]: parameterValue
          }
        } else {
          return previousValue;
        }
      }, {});
    }

    this.props.referenceSearchAction({
      ...searchParams,
      ...dataRowParams
    }, (result) => {
      cb({ ...result, ...dataRowParams });
    })
  }

  doInitialSearch = () => {
    ::this.doSearch(this.state.max, this.state.offset, this.state.sort, this.state.order);
  };

  onPaginateOnSortSearchCallback(result) {
    this.setState({
      ...result,
      selectedAll: false
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    ::this.doSearch(this.state.max, 0, this.state.sort, this.state.order);
  };

  handleColumnSort = (sort, order) => {
    ::this.doSearch(this.state.max, this.state.offset, sort, order, ::this.onPaginateOnSortSearchCallback);
  };

  onPaginate(offset) {
    ::this.doSearch(this.state.max, offset, this.state.sort, this.state.order, ::this.onPaginateOnSortSearchCallback);
  }

  onResultsPerPageSizeChange(size) {
    ::this.doSearch(size, 0, this.state.sort, this.state.order, ::this.onPaginateOnSortSearchCallback);
  }

  onSelect = (selectedItems) => {
    if (selectedItems.length === 0) {
      alert(`${this.context.i18n.getMessage('ReferenceSearchDialog.noItemsSelectedMessage')}`);
      return;
    }
    this.props.onSelect(selectedItems);
    this.props.onCloseDialog()
  };

  reset() {
    this.setState({ searchParams: {} });
  }

  selectAllItems = (checked) => {
    const { objectIdentifier } = this.props;
    const { selectedItems, items } = this.state;

    const newState = {
      selectedAll: checked,
      selectedItems: clone(selectedItems)
    };

    if (checked) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (find(selectedItems, { [objectIdentifier]: item[objectIdentifier] }) === undefined) {
          newState.selectedItems.push(item);
        }
      }
    } else {
      newState.selectedItems = reject(newState.selectedItems, (item) => {
        return find(items, { [objectIdentifier]: item[objectIdentifier] }) !== undefined
      });
    }
    this.setState(newState);
  };

  selectItem = (item, checked) => {
    const { objectIdentifier } = this.props;
    let selectedItems = clone(this.state.selectedItems);
    if (checked) {
      if (find(selectedItems, { [objectIdentifier]: item[objectIdentifier] }) === undefined) {
        selectedItems.push(item);
      }
    } else {
      selectedItems = reject(selectedItems, (selectedItem) => {
        return selectedItem[objectIdentifier] === item[objectIdentifier];
      });
    }

    this.setState({
      selectedAll: false,
      selectedItems
    });
  };

  render() {
    const { i18n } = this.context;

    const {
      multiple,
      modalSpecificProps,
      openDialog,
      onCloseDialog,
      title,
      searchFields,
      objectIdentifier,
      resultFields
    } = this.props;

    const {
      searchParams,
      selectedItems,
      items,
      selectedAll,
      sort,
      order,
      count,
      max,
      offset
    } = this.state;

    const style = {
      border: '0',
      paddingBottom: '0',
      verticalAlign: 'top'
    };

    return (
      <Modal
        {...modalSpecificProps}
        show={openDialog}
        onHide={() => {
          onCloseDialog();
          if (modalSpecificProps.onHide) {
            modalSpecificProps.onHide()
          }
        }}
        dialogClassName="reference-search-dialog"
        bsSize="lg"
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body ref='modal-body'>
          <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
            <div className="reference-search__table-container">
              <table className="table">
                <tbody>
                  <tr>
                  {searchFields.map((column, key) => {
                    return (
                      <td key={key + '-label-search-header'} style={style}>
                        <label htmlFor={column.name}>{column.label}</label>
                      </td>
                    );
                  })}
                  </tr>
                  <tr>
                  {searchFields.map((column, key) => {
                    if (column.inputComponent) {
                      const Component = column.inputComponent;
                      return (
                        <td key={key + '-label-search-header-input'} style={style}>
                          <Component
                            {...(searchFields[0].name === column.name && { autoFocus: true })}
                            onChange={(event) => this.onChangeSearchParam(
                              column.name, event.target.value
                            )}
                            value={searchParams[column.name] || ''}
                            id={column.name}
                          />
                        </td>
                      )
                    }
                    return (
                      <td key={key + '-label-search-header-input'} style={style}>
                        <input
                          {...(searchFields[0].name === column.name && { autoFocus: true })}
                          id={column.name}
                          type="text"
                          className="form-control"
                          onChange={(event) => this.onChangeSearchParam(
                            column.name, event.target.value
                          )}
                          value={searchParams[column.name] || ''}
                        />
                      </td>
                    );
                  })}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="form-submit text-right">
              <Button bsStyle="link" onClick={::this.reset}>
                {i18n.getMessage('ReferenceSearchDialog.resetLabel')}
              </Button>
              <Button bsStyle="primary" type="submit">
                {i18n.getMessage('ReferenceSearchDialog.searchLabel')}
              </Button>
            </div>
          </form>

          {items.length > 0 && multiple ? (
            <p>
               <Button
                 bsStyle="primary"
                 onClick={() => this.onSelect(selectedItems)}
               >
                 {i18n.getMessage('ReferenceSearchDialog.selectLabel')}
               </Button>
            </p>
          ) : null}

          {items.length > 0 ? (
            <table className="opuscapita_reference-search-dialog__table table">
              <thead>
                <tr>
                {multiple ?
                  (
                    <th className="header">
                      <input type="checkbox"
                        onChange={e => this.selectAllItems(e.target.checked)}
                        checked={selectedAll}
                      />
                  </th>
                  ) : null}
                  {resultFields.map((row, key) => {
                    return (
                      <th key={key + '-label-search-result-header'} className="header">
                        {row.sortable ? (
                          <nobr>
                            <SortableColumn
                              title={row.label}
                              test={row.name}
                              sort={sort}
                              order={order}
                              onSort={this.handleColumnSort}
                            />
                          </nobr>
                        ) : row.label}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {items.map((item, itemKey) => {
                  // eslint-disable-next-line max-len
                  const isItemSelected = find(selectedItems, { [objectIdentifier]: item[objectIdentifier] }) !== undefined;
                  return (
                    <tr key={itemKey + '-search-result-item-row'}>
                    {multiple ?
                      (
                        <td>
                          <input type="checkbox"
                            onChange={(e) => this.selectItem(item, e.target.checked)}
                            checked={isItemSelected}
                          />
                        </td>
                      ) : null}
                      {resultFields.map((row, headerKey) => {
                        if (!row.view) {
                          return (<td key={itemKey + '-' + headerKey + '-search-result-item-value'}>
                            <button
                              type="button"
                              className="btn btn-link"
                              onClick={() => this.onSelect([item])}
                              style={ { padding: 0 } }
                              title={get(item, row.name)}
                            >
                              {get(item, row.name)}
                            </button>
                          </td>)
                        } else {
                          return (<td key={itemKey + '-' + headerKey + '-search-result-item-value'}>
                            {row.view({ object: item, handleClick: () => this.onSelect([item]) })}
                          </td>)
                        }
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : null}

          {count >= 1 ? (
            <div className="container-fluid" style={{ padding: 0 }}>
              <div className="pull-right">
                <div className="paginate" style={{ display: 'flex', alignItems: 'center' }}>
                  <ResultSizePanel
                    onResize={::this.onResultsPerPageSizeChange}
                  />
                </div>
              </div>
              <div className="pull-right">
                <div className="paginate" style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="pull-left">
                    {i18n.getMessage('ReferenceSearchDialog.itemsFound', { number: count })}
                  </div>
                  <PaginationPanel
                    count={count}
                    max={max}
                    offset={offset}
                    onPaginate={::this.onPaginate}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bs-callout bs-callout-info">
              {i18n.getMessage('ReferenceSearchDialog.itemsFound', { number: 0 })}
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}
