jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const Modal = require('react-bootstrap/lib/Modal');
import SortableColumn from '../../SortableColumn';
import PaginationPanel from '../../PaginationPanel';
const ReferenceSearchDialog = require('../ReferenceSearchDialog.react').default;
const { I18nContext } = require('@opuscapita/react-i18n');

describe('ReferenceSearchDialog', () => {
  it('should focus first input field when dialog open', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'name', label: 'Name' }
    ];
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={false}
          referenceSearchAction={() => {}}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );

    it('test is rendered', () => {
      expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
    });

    it('no active element on the page', () => {
      expect(document.activeElement).toBeUndefined();
    });

    componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={() => {}}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    it('test is rendered', () => {
      expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
    });
    it('there is an active element on the page', () => {
      expect(document.activeElement).toBeDefined();
    });
    // don't work in test
    // expect(document.activeElement.id).toEqual('manufacturerId');
  });

  it('test search', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'name', label: 'Name' }
    ];
    let referenceSearchAction = jest.fn();
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={referenceSearchAction}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const manufacturerInput = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
      querySelector('#manufacturerId');
    const nameInput = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).querySelector('#name');
    ReactTestUtils.Simulate.change(manufacturerInput, { target: { value: 'manufacturerParam' } });
    ReactTestUtils.Simulate.change(nameInput, { target: { value: 'nameParam' } });
    expect(referenceSearchDialog.state.searchParams.manufacturerId).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.manufacturerId).toBe('manufacturerParam');
    expect(referenceSearchDialog.state.searchParams.name).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.name).toBe('nameParam');
    const form = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).querySelector('form');
    ReactTestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].manufacturerId).toBe('manufacturerParam');
    expect(referenceSearchAction.mock.calls[1][0].name).toBe('nameParam');
    ReactTestUtils.Simulate.change(manufacturerInput, { target: { value: '' } });
    ReactTestUtils.Simulate.change(nameInput, { target: { value: '' } });
    ReactTestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(3);
    expect(referenceSearchAction.mock.calls[2][0].manufacturerId).toBeUndefined();
    expect(referenceSearchAction.mock.calls[2][0].name).toBeUndefined();
    ReactTestUtils.Simulate.change(manufacturerInput, { target: { value: '  test  ' } });
    ReactTestUtils.Simulate.change(nameInput, { target: { value: '    ' } });
    ReactTestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(4);
    expect(referenceSearchAction.mock.calls[3][0].manufacturerId).toBe('test');
    expect(referenceSearchAction.mock.calls[3][0].name).toBeUndefined();
  });

  it('test input rendering count', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={() => {}}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const searchInputs = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).querySelectorAll('input');
    expect(searchInputs.length).toBe(3);
  });

  it('test select single value', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100', manufacturerId: 'test_mfd' }, { id: '200' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toEqual(expect.anything());
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    expect(modalComponent).toEqual(expect.anything());
    const modalNode = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement());
    expect(modalNode).toEqual(expect.anything());
    // fint search result table
    const tables = modalNode.querySelectorAll('table');
    // at least search form table and result table
    expect(tables).toEqual(expect.anything());
    expect(tables.length).toBeGreaterThanOrEqual(2);
    // take search result table
    const searchResultTable = tables[1];
    // all rows
    const searchResultTableRows = searchResultTable.querySelectorAll('tr');
    // expect at least 1 header row and 1 found item row
    expect(searchResultTableRows.length).toBeGreaterThanOrEqual(2);
    // find firt button
    const buttonWithManufacturerId = searchResultTableRows[1].querySelector('button');
    expect(buttonWithManufacturerId).toEqual(expect.anything());
    // this button should contain text of 'manufacturerId' property value
    expect(buttonWithManufacturerId.textContent).toBe('test_mfd');
    // simulate button click
    ReactTestUtils.Simulate.click(buttonWithManufacturerId);
    // chekc that out callbacks with correct parameters are called
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0][0].id).toBe('100');
    expect(onCloseDialog.mock.calls.length).toBe(1);
  });

  it('test check multiple values', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={true}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const checkboxes = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
       querySelectorAll('input[type="checkbox"]');
    ReactTestUtils.Simulate.change(checkboxes[1], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(1);
    expect(referenceSearchDialog.state.selectedItems[0].id).toBe('100');
    ReactTestUtils.Simulate.change(checkboxes[2], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(2);
    expect(referenceSearchDialog.state.selectedItems[1].id).toBe('200');
    ReactTestUtils.Simulate.change(checkboxes[2], { "target": { "checked": false } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(1);
    expect(referenceSearchDialog.state.selectedItems[0].id).toBe('100');
    ReactTestUtils.Simulate.change(checkboxes[0], { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(fields.length);
    expect(referenceSearchDialog.state.selectedAll).toBeTruthy();
    expect(referenceSearchDialog.state.selectedItems[2].id).toBe('300');
    ReactTestUtils.Simulate.change(checkboxes[0], { "target": { "checked": false } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(0);
    expect(referenceSearchDialog.state.selectedAll).toBeFalsy();
  });

  it('test select multiple values', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
          multiple={true}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const selectAllCheckbox = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
      querySelectorAll('input[type="checkbox"]')[0];
    ReactTestUtils.Simulate.change(selectAllCheckbox, { "target": { "checked": true } });
    expect(referenceSearchDialog.state.selectedItems.length).toBe(3);
    expect(referenceSearchDialog.state.selectedAll).toBeTruthy();
    const selectButton = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
       querySelector('p button.btn-primary');
    ReactTestUtils.Simulate.click(selectButton);
    expect(onSelect.mock.calls.length).toBe(1);
    expect(onSelect.mock.calls[0][0].length).toBe(3);
    expect(onSelect.mock.calls[0][0][0].id).toBe('100');
    expect(onSelect.mock.calls[0][0][1].id).toBe('200');
    expect(onSelect.mock.calls[0][0][2].id).toBe('300');
    expect(onCloseDialog.mock.calls.length).toBe(1);
  });

  it('test select multiple values with none is checked', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onSelect = jest.fn();
    let onCloseDialog = jest.fn();
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={onCloseDialog}
          onSelect={onSelect}
          multiple={true}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const selectButton = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
      querySelector('p button.btn-primary');
    ReactTestUtils.Simulate.click(selectButton);
    expect(onSelect.mock.calls.length).toBe(0);
    expect(onCloseDialog.mock.calls.length).toBe(0);
  });

  it('test rendering field with specified "view"', () => {
    let searchFields = [
      {
        name: 'manufacturerId',
        label: 'Mfg ID',
        view: () => {
          return (<cite>custom view</cite>);
        }
      },
    ];
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={(params, callback) => {
            callback({ items: [{ id: '100' }, { id: '200' }, { id: '300' }] })
          }}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={[]}
          resultFields={searchFields}
          objectIdentifier="manufacturerId"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const view = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).querySelectorAll('cite');
    // <cite> will be rendred once per each found item, e.g. 3 times
    expect(view.length).toBe(3);
    // each cite has the same value
    expect(view[0].textContent).toBe("custom view");
  });

  it('test on paginate change', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let items = [];
    for (let id = 1; id <= 10; id++) {
      items.push({ id });
    }
    let referenceSearchAction = jest.fn((params, callback) => {
      callback({
        items,
        count: 15
      });
    });
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={referenceSearchAction}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toBeDefined();
    const modalBody = referenceSearchDialog.refs['modal-body'];
    const paginationPanel = ReactTestUtils.findRenderedComponentWithType(modalBody, PaginationPanel);

    expect(referenceSearchAction.mock.calls.length).toBe(1);
    expect(referenceSearchAction.mock.calls[0][0].offset).toBe(0);
    paginationPanel.onSelect(2);
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    // expect(referenceSearchAction.mock.calls[1][0].offset).toBe(10);
  });

  it('test on column sort', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID', sortable: true },
      { name: 'supplierId', label: 'Spl ID', rowValueLabel: { className: 'a', getValue: () => 'b' } },
      { name: 'name', label: 'Name' }
    ];
    let items = [];
    for (let id = 1; id <= 10; id++) {
      items.push({ id })
    }
    let referenceSearchAction = jest.fn((params, callback) => {
      callback({
        items,
        count: 15
      })
    });
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={referenceSearchAction}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toBeDefined();
    const modalBody = referenceSearchDialog.refs['modal-body'];
    const sortableColumn = ReactTestUtils.findRenderedComponentWithType(modalBody, SortableColumn);
    expect(referenceSearchAction.mock.calls.length).toBe(1);
    sortableColumn.onSort({ preventDefault: () => {} });
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].sort).toBe('manufacturerId');
    expect(referenceSearchAction.mock.calls[1][0].order).toBe('asc');
    sortableColumn.onSort({ preventDefault: () => {} });
    expect(referenceSearchAction.mock.calls.length).toBe(3);
    expect(referenceSearchAction.mock.calls[2][0].sort).toBe('manufacturerId');
    expect(referenceSearchAction.mock.calls[2][0].order).toBe('desc');
  });

  it('test with modalSpecificProps props', () => {
    let fields = [
      { name: 'manufacturerId', label: 'Mfg ID' },
      { name: 'supplierId', label: 'Spl ID' },
      { name: 'name', label: 'Name' }
    ];
    let onHide = jest.fn();
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchDialog
          title="test"
          openDialog={true}
          referenceSearchAction={() => {}}
          onCloseDialog={() => {}}
          onSelect={() => {}}
          multiple={false}
          searchFields={fields}
          resultFields={fields}
          objectIdentifier="id"
          modalSpecificProps={{
            onHide
          }}
        />
      </I18nContext>
    );
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchDialog);
    expect(referenceSearchDialog).toBeDefined();
    const modalComponent = ReactTestUtils.findRenderedComponentWithType(referenceSearchDialog, Modal);
    const closeDialogButton = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).
    querySelector('button.close');
    ReactTestUtils.Simulate.click(closeDialogButton);
    expect(onHide.mock.calls.length).toBe(1);
  });
});
