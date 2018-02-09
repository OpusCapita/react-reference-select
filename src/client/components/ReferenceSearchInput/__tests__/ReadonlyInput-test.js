jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const ReadonlyInput = require('../ReadonlyInput.react').default;

describe('ReadonlyInput', () => {
  let componentTree = ReactTestUtils.renderIntoDocument(
    <ReadonlyInput
      labelProperty={"labelProperty"}
      valueProperty={"valueProperty"}
    />
  );

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('test with single value', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <ReadonlyInput
        labelProperty={"labelProperty"}
        valueProperty={"valueProperty"}
        value={{ labelProperty: 'someValue' }}
      />
    );
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("someValue");
  });

  it('test multiple values with null element', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <ReadonlyInput
        labelProperty={"labelProperty"}
        valueProperty={"valueProperty"}
        value={[{ labelProperty: 'someValue' }, null]}
        multiple={true}
      />
    );
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("someValue; ");
  });

  it('test with multiple values', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <ReadonlyInput
        labelProperty={"labelProperty"}
        valueProperty={"valueProperty"}
        value={[{ labelProperty: 'someValue' }, { valueProperty: 'anotherValue' }]}
        multiple={true}
      />
    );
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("someValue; anotherValue");
  });

  it('test input value unchangeable', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <ReadonlyInput
        valueProperty={""}
        labelProperty={"labelProperty"}
        value={{ labelProperty: 'anotherValue' }}
      />
    );
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("anotherValue");
    ReactTestUtils.Simulate.change(inputElement, { target: { value: 'test' } });
    expect(inputElement.value).toBe("anotherValue");
  });

  it('test input value re-rendering', () => {
    let root = document.createElement('div');
    let componentTree = ReactDOM.render(
      <ReadonlyInput
        labelProperty={""}
        valueProperty={"labelProperty"}
        value={{ labelProperty: 'anotherValue' }}
      />, root);
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("anotherValue");

    ReactDOM.render(
      <ReadonlyInput
        labelProperty={""}
        valueProperty={"labelProperty"}
        value={{ valueProperty: 'anotherValue' }}
      />, root);
    expect(inputElement.value).toBe("");
  });
});
