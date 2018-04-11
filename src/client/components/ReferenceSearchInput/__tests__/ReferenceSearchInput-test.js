jest.autoMockOff();

const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-dom/test-utils');
const ReferenceSearchInput = require('../ReferenceSearchInput.react').default;
const ReferenceSearchDialog = require('../../ReferenceSearchDialog/ReferenceSearchDialog.react').default;
const { I18nContext } = require('@opuscapita/react-i18n');

describe('ReferenceSearchInput', () => {
  let componentTree;

  let selectableValueField;

  beforeEach(function() {
    selectableValueField = undefined;

    componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => { }}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          onChange={(v) => { selectableValueField = v }}
        />
      </I18nContext>
    );
  });

  it('test is rendered', () => {
    expect(ReactDOM.findDOMNode(componentTree)).toBeDefined();
  });

  it('test is dialog open', () => {
    const referenceSearchInput = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
    const searchButton = ReactDOM.findDOMNode(referenceSearchInput).querySelector('button');
    expect(searchButton).toBeDefined();
    ReactTestUtils.Simulate.click(searchButton);
    expect(referenceSearchInput.state.openDialog).toBeTruthy();
  });

  it('test rendering with child', () => {
    let TestChildComponent = class extends React.Component {
      render() {
        return (
          <table>
            <tbody>
              <tr>
                <td>Column1</td>
                <td>Column2</td>
              </tr>
            </tbody>
          </table>
        );
      }
    };
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => { }}
          onChange={() => { }}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
        >
          <TestChildComponent />
        </ReferenceSearchInput>
      </I18nContext>
    );
    const testChildComponent = ReactTestUtils.findRenderedComponentWithType(componentTree, TestChildComponent);
    expect(testChildComponent).toBeDefined();
    expect(testChildComponent.props.readOnly).toBeFalsy();
    expect(testChildComponent.props.disabled).toBeFalsy();
  });

  it('test reset button with single value', () => {
    const referenceSearchInput = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog = ReactTestUtils.
      findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    referenceSearchDialog.onSelect([{ id: '100' }]);

    expect(referenceSearchInput.state.value).toMatchObject({ id: '100' })
    expect(selectableValueField).toMatchObject({ id: '100' })

    const resetButton = ReactDOM.findDOMNode(referenceSearchInput).querySelectorAll('button')[1];
    expect(resetButton).toBeDefined();
    ReactTestUtils.Simulate.click(resetButton);
    expect(referenceSearchInput.state.value).toBe(null);
    expect(selectableValueField).toBeNull();
  });

  it('test reset button with multiple values', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => { }}
          onChange={(v) => { selectableValueField = v }}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          multiple={true}
        />
      </I18nContext>
    );
    const referenceSearchInput = ReactTestUtils.findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog = ReactTestUtils.findRenderedComponentWithType(
      referenceSearchInput,
      ReferenceSearchDialog
    );

    const selectedValues = [{ id: '100' }, { id: '200' }, { id: '300' }];
    referenceSearchDialog.onSelect(selectedValues);

    expect(referenceSearchInput.state.value).toHaveLength(3);
    expect(referenceSearchInput.state.value).toEqual(
      expect.arrayContaining(selectedValues),
    );
    expect(selectableValueField).toEqual(
      expect.arrayContaining(selectedValues),
    );
    const resetButton = ReactDOM.findDOMNode(referenceSearchInput).querySelectorAll('button')[1];
    expect(resetButton).toBeDefined();
    ReactTestUtils.Simulate.click(resetButton);
    expect(referenceSearchInput.state.value).toHaveLength(0);
  });

  it('test is dialog close', () => {
    const referenceSearchInput = ReactTestUtils.
      findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog = ReactTestUtils.
      findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
    const searchButton = ReactDOM.findDOMNode(referenceSearchInput).querySelector('button');
    expect(searchButton).toBeDefined();
    ReactTestUtils.Simulate.click(searchButton);
    expect(referenceSearchInput.state.openDialog).toBeTruthy();
    referenceSearchDialog.onSelect([{ id: '100' }]);
    expect(referenceSearchInput.state.openDialog).toBeFalsy();
  });

  it('test multiple values choice with value property', () => {
    let componentTree = ReactTestUtils.renderIntoDocument(
      <I18nContext>
        <ReferenceSearchInput
          title={"test"}
          labelProperty={"labelProperty"}
          valueProperty={"valueProperty"}
          referenceSearchAction={() => { }}
          onChange={() => { }}
          searchFields={[{
            name: "name",
            label: "label"
          }]}
          resultFields={[{
            name: "name2",
            label: "label2"
          }]}
          multiple={true}
          value={[{ labelProperty: 'testValue1' }, { valueProperty: 'testValue2' }, { xxxProperty: 'xxx' }]}
        />
      </I18nContext>
    );
    const referenceSearchInput = ReactTestUtils.
      findRenderedComponentWithType(componentTree, ReferenceSearchInput);
    const referenceSearchDialog = ReactTestUtils.
      findRenderedComponentWithType(referenceSearchInput, ReferenceSearchDialog);
    referenceSearchDialog.onSelect([{ valueProperty: '100' }, { valueProperty: 'testValue2' }]);
    expect(referenceSearchInput.state.value.length).toBe(2);
  });
});
