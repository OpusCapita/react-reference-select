jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const { I18nContext } = require('@opuscapita/react-i18n');
const ReferenceAutocomplete = require('../ReferenceAutocomplete.react').default;
const Select = require('@opuscapita/react-select');

describe('ReferenceAutocomplete', () => {
  let domNode;

  let renderReferenceAutocomplete = (node, value, multiple = false, autocompleteActionResult = { options: [] }) => {
    return ReactDOM.render(<I18nContext>
      <ReferenceAutocomplete
        value={value}
        multiple={multiple}
        autocompleteAction={(input) => {
          return Promise.resolve(autocompleteActionResult)
        }}
        labelProperty="label"
        valueProperty="id"
      />
    </I18nContext>, node);
  };

  it('tests validation of different combinations of "value" and "multipe" props', function() {
    domNode = document.createElement('div');
    expect(() => {renderReferenceAutocomplete(domNode, { id: 'test' }, true)}).toThrow();
    expect(() => {renderReferenceAutocomplete(domNode, [{ id: 'test' }], false)}).toThrow();
    domNode.remove();
  });

  it('tests that state is no updated if property value is not updated', function() {
    domNode = document.createElement('div');

    const value = { id: 'test' };
    let componentsTree = renderReferenceAutocomplete(domNode, value);
    let referenceAutocompleteInstance = ReactTestUtils.
        findRenderedComponentWithType(componentsTree, ReferenceAutocomplete);
    let firstRenderStateValue = referenceAutocompleteInstance.state.value;
    expect(firstRenderStateValue).toBe(value);
    // rerender using the same value
    renderReferenceAutocomplete(domNode, value);
    // state is not updated
    expect(referenceAutocompleteInstance.state.value).toBe(firstRenderStateValue);

    domNode.remove();
  });


  it('checks that result options are sorted by label by default', function(done) {
    const options = [{ value: '2', label: '2' }, { value: '1', label: '1' }];
    // create dom node
    domNode = document.createElement('div');
    // render component
    let componentsTree = renderReferenceAutocomplete(domNode, null, false, { options });
    // find Select.Async instance
    let selectAsyncInstance = ReactTestUtils.findRenderedComponentWithType(componentsTree, Select.Async);
    // check result of loadOptions prop Promise call results
    selectAsyncInstance.props.loadOptions().
      then(result => {
        expect(result.options.length).toBe(2);
        expect(result.options[0]).toBe(options[1]);
        expect(result.options[1]).toBe(options[0]);
        done();
      }
    );
  });

  it('checks that result options are not sorted by label if result.sort is set to false', function(done) {
    const options = [{ value: '2', label: '2' }, { value: '1', label: '1' }];
    // create dom node
    domNode = document.createElement('div');
    // render component
    let componentsTree = renderReferenceAutocomplete(domNode, null, false, { options, sort: false });
    // find Select.Async instance
    let selectAsyncInstance = ReactTestUtils.findRenderedComponentWithType(componentsTree, Select.Async);
    // check result of loadOptions prop Promise call results
    selectAsyncInstance.props.loadOptions().
      then(result => {
        expect(result.options).toBe(options);
        done();
      }
    );
  });

  /**
   it('test change autocomplete value', function() {
    domNode = document.createElement('div');

    const value1 = { label: 'one', id: '1' };
    const value2 = { label: 'two', id: '2' };

    let componentsTree = ReactDOM.render(<I18nContext>
      <ReferenceAutocomplete
        value={value1}
        autocompleteAction={(input) => {
          return Promise.resolve({ options: [value1, value2], complete: true })
        }}
        labelProperty="label"
        valueProperty="id"
      />
    </I18nContext>, domNode);

    let referenceAutocompleteInstance = ReactTestUtils
        .findRenderedComponentWithType(componentsTree, ReferenceAutocomplete);
    let firstRenderStateValue = referenceAutocompleteInstance.state.value;
    expect(firstRenderStateValue).toBe(value1);


    let selectInstance = ReactTestUtils.findRenderedComponentWithType(componentsTree, Select);
    let searchInstance = ReactDOM.findDOMNode(selectInstance.refs.input);

    let searchInputNode = searchInstance.querySelector('input');

    ReactTestUtils.Simulate.change(searchInputNode, { target: { value: 'two' } });
    ReactTestUtils.Simulate.keyDown(searchInputNode, { keyCode: 13, key: 'Enter' });

    let secondRenderStateValue = referenceAutocompleteInstance.state.value;
    expect(secondRenderStateValue).toBe(value2);

    domNode.remove();
  });**/
});
