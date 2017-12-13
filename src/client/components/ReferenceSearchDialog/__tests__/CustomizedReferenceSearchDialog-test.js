jest.autoMockOff();

const React = require('react');
const PropTypes = require('prop-types');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const Modal = require('react-bootstrap/lib/Modal');
const ReferenceSearchDialog = require('../ReferenceSearchDialog.react').default;
const { I18nContext } = require('@opuscapita/react-i18n');

class TestReferenceSearchDialogInputComponent extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
    refName: PropTypes.string
  };

  focus() {
    let element = this.refs[this.props.id];
    if (element) {
      setTimeout(() => element.focus(), 300);
    }
  }

  render() {
    const { id, onChange, value } = this.props;
    return (
      <input type="text" id={id} className="form-control" value={value} onChange={onChange} ref={id}/>
    );
  }
}

describe('CustomizedReferenceSearchDialog', () => {
  let fields = [
      { name: 'test_field1', label: 'Test Field 1', inputComponent: TestReferenceSearchDialogInputComponent },
      { name: 'test_field2', label: 'Test Field 2' }
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

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('there is an active element on the page', () => {
    expect(document.activeElement).toBeDefined();
  });

  it('test search', () => {
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
      querySelector('#test_field1'); ReactTestUtils.Simulate.change(manufacturerInput, { target: { value: 'test1' } });
    expect(referenceSearchDialog.state.searchParams.test_field1).toBeDefined();
    expect(referenceSearchDialog.state.searchParams.test_field1).toBe('test1');
    const form = ReactDOM.findDOMNode(modalComponent._modal.getDialogElement()).querySelector('form');
    ReactTestUtils.Simulate.submit(form);
    expect(referenceSearchAction.mock.calls.length).toBe(2);
    expect(referenceSearchAction.mock.calls[1][0].test_field1).toBe('test1');
  });
});
