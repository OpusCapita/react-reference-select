import PropTypes from 'prop-types';
import React from 'react';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import Select from '@opuscapita/react-select';
import translations from './i18n';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReactSelectSpecificProps from '../ReactSelectSpecificProps';

export default
class ReferenceAutocomplete extends React.Component {
  static propTypes = {
    ...ReferenceInputBaseProps,
    // custom prop types
    autocompleteAction: PropTypes.func.isRequired,
    labelProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    // react-select specific props
    reactSelectSpecificProps: PropTypes.shape(ReactSelectSpecificProps)
  };

  static contextTypes = {
    i18n: PropTypes.object.isRequired
  };

  static defaultProps = {
    disabled: false,
    multiple: false
  };

  constructor(props, context) {
    super(props, context);
    if (!this.validateValue(props.value, props.multiple || false)) {
      throw new Error(`Invalid reference search value: ${props.value}. Only of 'object' and 'array' are supported.`);
    }
    this.state = {
      value: props.value
    };
  }

  componentWillMount() {
    this.context.i18n.register('ReferenceAutocomplete', translations);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.validateValue(nextProps.value, nextProps.multiple || false)) {
      throw new Error(`Invalid reference search value: ${nextProps.value}.
        Only of 'object' and 'array' are supported.`);
    }

    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  /**
   * force options reloading using '' term
   */
  reloadOptions = () => {
    const selector = this.refs['Select.Async'];
    if (selector !== undefined && selector.loadOptions !== undefined) {
      selector.loadOptions('');
    }
  };

  onBlur = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    // in case when nonexisting value is entered by user in autocomplete
    // empty options list is loaded/shown then user switch focus to another UI
    // element and then go bak to autocomplete and see again empty options list
    // that was loaded for non existing value, while after focus we need to show
    // all (or first xxx options) that are available
    // So for fixing this situation we force options reloading using '' term.
    this.reloadOptions();
  };

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value ? value : (this.props.multiple ? [] : null));
    }
    this.setState({ value: value });

    // Reload options after cleaning of the selectbox
    if (value === null) {
      this.reloadOptions();
    }
  };

  validateValue(value, multiple) {
    if (multiple && Array.isArray(value)) {
      return true;
    } else if (!multiple && isObject(value) && !Array.isArray(value)) {
      return true;
    } else {
      return isEmpty(value);
    }
  }

  render() {
    let { autocompleteAction, labelProperty } = this.props;
    let autoCompleteProps = {
      name: this.props.name,
      onFocus: this.props.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
      cache: {},
      loadOptions: (input) => {
        return autocompleteAction(input).then((result) => {
          const { options = [], sort = true, complete = false } = result;
          return {
            options: sort ? sortBy(options, (option) => {
              return `${option[labelProperty]}`.toLowerCase();
            }) : options,
            complete: complete
          }
        });
      },
      labelKey: this.props.labelProperty,
      valueKey: this.props.valueProperty,
      matchProp: 'label',
      value: this.state.value,
      disabled: this.props.disabled || this.props.readOnly,
      multi: this.props.multiple,
      ignoreCase: false,
      filterOption: (option, filterString) => {
        if (filterString) {
          let labelTest = String(option[labelProperty]);
          return labelTest.toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
        }
        return true;
      },
      ignoreAccents: false,
      isLoading: this.state.isLoading,
      // labels:
      clearAllText: this.context.i18n.getMessage("ReferenceAutocomplete.clearAllText"),
      clearValueText: this.context.i18n.getMessage("ReferenceAutocomplete.clearValueText"),
      noResultsText: this.context.i18n.getMessage("ReferenceAutocomplete.noResultsText"),
      placeholder: this.context.i18n.getMessage("ReferenceAutocomplete.placeholder"),
      loadingPlaceholder: this.context.i18n.getMessage("ReferenceAutocomplete.loadingPlaceholder"),
      searchPromptText: this.context.i18n.getMessage("ReferenceAutocomplete.noResultsText"),
      ...this.props.reactSelectSpecificProps
    };
    return (
      <div className="jc-reference-autocomplete">
        <Select.Async {... autoCompleteProps} ref="Select.Async"/>
      </div>
    );
  }
}
