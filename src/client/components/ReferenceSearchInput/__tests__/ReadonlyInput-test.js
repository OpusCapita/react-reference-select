jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');
const ReadonlyInput = require('../ReadonlyInput.react').default;

describe('ReadonlyInput', () => {
  let componentTree = TestUtils.renderIntoDocument(
    <ReadonlyInput
      labelProperty={"labelProperty"}
      valueProperty={"valueProperty"}
    />
  );

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('test is thrown exception on wrong props', () => {
    let errorMessage;
    try {
      TestUtils.renderIntoDocument(
        <ReadonlyInput
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          value={"invalidValue"}
          multiple={true}
        />
      );
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toBe(
      "Invalid reference search value: invalidValue. Only of 'object' and 'array' are supported."
    );
  });

  it('test with single value', () => {
    let componentTree = TestUtils.renderIntoDocument(
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
    let componentTree = TestUtils.renderIntoDocument(
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
    let componentTree = TestUtils.renderIntoDocument(
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
    let componentTree = TestUtils.renderIntoDocument(
      <ReadonlyInput
        valueProperty={""}
        labelProperty={"labelProperty"}
        value={{ labelProperty: 'anotherValue' }}
      />
    );
    let inputElement = ReactDOM.findDOMNode(componentTree);
    expect(inputElement).toBeDefined();
    expect(inputElement.value).toBe("anotherValue");
    TestUtils.Simulate.change(inputElement, { target: { value: 'test' } });
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

  it('test input re-rendering with wrong value', () => {
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
    let errorMessage;
    try {
      ReactDOM.render(
        <ReadonlyInput
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          value={"invalidValue"}
          multiple={true}
        />, root);
    } catch (e) {
      errorMessage = e.message;
    }
    expect(errorMessage).toBeDefined();
    expect(errorMessage).toBe(`Invalid reference search value: invalidValue.
        Only of 'object' and 'array' are supported.`);
  });
});
