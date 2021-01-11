import PropTypes from 'prop-types';
import React from 'react';
import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';
import isEmpty from 'lodash/isEmpty';
import Select from '@opuscapita/react-select';
import translations from './i18n';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReactSelectSpecificProps from '../ReactSelectSpecificProps';
import { withResizeDetector } from 'react-resize-detector';

class ReferenceAutocomplete extends React.Component {
  static propTypes = {
    ...ReferenceInputBaseProps,
    // custom prop types
    autocompleteAction: PropTypes.func.isRequired,
    defaultOptions: PropTypes.array,
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
  }

  state = {
    defaultOptions: this.props.defaultOptions
  };

  componentWillMount() {
    this.context.i18n.register('ReferenceAutocomplete', translations);
  }

  componentDidMount() {
    if (!this.state.defaultOptions) {
      this.getOptions('', (defaultOptions) => {
        this.setState({ defaultOptions });
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!isEqual(this.props.defaultOptions, nextProps.defaultOptions)) {
      this.setState({ defaultOptions: nextProps.defaultOptions });
    }

    if (!this.validateValue(nextProps.value, nextProps.multiple || false)) {
      throw new Error(`Invalid reference search value: ${nextProps.value}.
        Only of 'object' and 'array' are supported.`);
    }

    if (!isEqual(nextProps.value, this.props.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  onChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value ? value : (this.props.multiple ? [] : null));
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

  getOptionLabel = (option) => {
    const { labelProperty } = this.props;
    return option[labelProperty];
  };

  getOptionValue = (option) => {
    const { valueProperty } = this.props;
    return option[valueProperty];
  };

  getOptions = (input, callback) => {
    const { autocompleteAction } = this.props;
    autocompleteAction(input).then((result) => {
      callback(result)
    });
  };

  render() {
    const { i18n } = this.context;
    const { id, name, onBlur, styles = {} } = this.props;
    const { defaultOptions } = this.state;

    const defaultMultiValueLabel = (provided) => {
      const rMargin = 150;
      const defaultMinWidth = 200;
      const { width = (rMargin + defaultMinWidth) } = this.props;
      const maxWidth = Math.max(width - rMargin, defaultMinWidth);

      return {
        ...provided,
        maxWidth: `${maxWidth}px`,
      }
    };
    const {
        multiValueLabel: customMultiValueLabel = (provided, state) => provided,
        ...otherStyles
    } = styles;
    const autoCompleteProps = {
      inputId: id,
      name,
      // onFocus: this.props.onFocus,
      onBlur,
      onChange: this.onChange,
      defaultOptions,
      loadOptions: this.getOptions,
      getOptionLabel: this.getOptionLabel,
      getOptionValue: this.getOptionValue,
      value: this.props.value,
      isDisabled: this.props.disabled || this.props.readOnly,
      isMulti: this.props.multiple,
      // labels:
      noOptionsMessage: () => i18n.getMessage("ReferenceAutocomplete.noResultsText"),
      placeholder: i18n.getMessage("ReferenceAutocomplete.placeholder"),
      styles: {
        ...otherStyles,
        multiValueLabel: (provided, state) => {
          customMultiValueLabel(defaultMultiValueLabel(provided, state), state)
        }
      }
    };
    const reactSelectSpecificProps = this.props.reactSelectSpecificProps ? this.props.reactSelectSpecificProps : {};
    const { key, clearable, onOpen, className, placeholder, menuPortalTarget } = reactSelectSpecificProps;
    if (key) {
      autoCompleteProps.key = key;
    }
    if (clearable !== undefined) {
      autoCompleteProps.isClearable = clearable;
    }
    if (onOpen) {
      autoCompleteProps.onMenuOpen = onOpen;
    }
    if (className) {
      autoCompleteProps.className = className;
    }
    if (placeholder) {
      autoCompleteProps.placeholder = placeholder;
    }
    if (menuPortalTarget) {
      autoCompleteProps.menuPortalTarget = menuPortalTarget;
    }

    return (
      <div className="jc-reference-autocomplete">
        <Select.Async {... autoCompleteProps}/>
      </div>
    );
  }
}

export default withResizeDetector(ReferenceAutocomplete)
