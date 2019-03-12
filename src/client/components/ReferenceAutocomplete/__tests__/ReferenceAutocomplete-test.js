jest.autoMockOff();

const React = require('react');
const { mount } = require('enzyme');
const { I18nContext } = require('@opuscapita/react-i18n');
const ReferenceAutocomplete = require('../ReferenceAutocomplete.react').default;

describe('ReferenceAutocomplete', () => {
  const renderReferenceAutocomplete = (props) => {
    return mount(<I18nContext>
      <ReferenceAutocomplete
        {...props}
      />
    </I18nContext>);
  };

  it('should selected text', () => {
    const options = [
      { label: "test-label", value: "test-value" },
      { label: "test1-label", value: "test1-value" },
    ];

    const wrapper = renderReferenceAutocomplete({
      labelProperty: "label",
      valueProperty: "value",
      value: { label: "test-label", value: "test-value" },
      autocompleteAction(term) {
        return new Promise((resolve) => {
          resolve(options);
        });
      }
    });
    const label = wrapper.find('.opuscapita_react-select__single-value');
    expect(label).not.toBeNull();

    expect(label.text()).toBe('test-label');
  });

  it('should selected multiple text', () => {
    const options = [
      { label: "test-label", value: "test-value" },
      { label: "test1-label", value: "test1-value" },
    ];

    const wrapper = renderReferenceAutocomplete({
      labelProperty: "label",
      valueProperty: "value",
      multiple: true,
      value: [
        { label: "test-label", value: "test-value" },
        { label: "test1-label", value: "test1-value" }
      ],
      autocompleteAction(term) {
        return new Promise((resolve) => {
          resolve(options);
        });
      }
    });
    const labels = wrapper.find('.opuscapita_react-select__multi-value');
    expect(labels).not.toBeNull();

    expect(labels.at(0).text()).toBe('test-label');
    expect(labels.at(1).text()).toBe('test1-label');
  });


  // it.only('should select text', () => {
  //   const options = [
  //     {label: "test-label", value: "test-value"},
  //     {label: "test1-label", value: "test1-value"},
  //   ];
  //   let option = null;
  //
  //   const wrapper = renderReferenceAutocomplete({
  //     labelProperty: "label",
  //     valueProperty: "value",
  //     onChange(selectedOption) {
  //       option = selectedOption
  //     },
  //     autocompleteAction(term) {
  //       return new Promise((resolve) => {
  //         resolve(options);
  //       });
  //     }
  //   });
  //
  //   wrapper.setProps({ inputValue: 'test1-label' });
  //   const inputSelectWrapper = wrapper.find('div.opuscapita_react-select__value-container');
  //
  //   inputSelectWrapper.simulate('change', {currentTarget: { value: 'test1-label' }});
  //   inputSelectWrapper.simulate('keypress', {key: 'Enter'});
  //
  //   expect(option).not.toBeNull();
  //
  //   // expect(label.text()).toBe('test-label');
  //
  //   // const input = container.querySelector('.opuscapita_react-select__input');
  //   // input.value = "text1";
  //   //
  //   // ReactTestUtils.Simulate.change(input);
  //   // ReactTestUtils.Simulate.keyDown(input, {key: "Enter", keyCode: 13, which: 13});
  //   //
  //   // label = container.querySelector('.opuscapita_react-select__single-value');
  //   // expect(label.textContent).toBe('text1-label');
  //   //
  //   // container.remove();
  // });
});
