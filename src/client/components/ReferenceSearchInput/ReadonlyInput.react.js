import React from 'react';
import lodash from 'lodash';

import ReferenceInputBaseProps from '../ReferenceInputBaseProps';

export default
class ReadonlyInput extends React.Component {

  static propTypes = {
    ...ReferenceInputBaseProps,
    labelProperty: React.PropTypes.string.isRequired,
    valueProperty: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    if (!this.validateValue(props.value, props.multiple || false)) {
      throw new Error(`Invalid reference search value: ${props.value}. Only of 'object' and 'array' are supported.`);
    }
    this.state = {
      value: lodash.isUndefined(props.value) ? null : props.value
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (!this.validateValue(nextProps.value, nextProps.multiple || false)) {
      throw new Error(`Invalid reference search value: ${nextProps.value}.
        Only of 'object' and 'array' are supported.`);
    }
    if (!lodash.isEqual(nextProps.value, this.state.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  validateValue(value, multiple) {
    if (multiple && lodash.isArray(value)) {
      return true;
    } else if (!multiple && lodash.isObject(value) && !lodash.isArray(value)) {
      return true;
    } else {
      return lodash.isEmpty(value);
    }
  }

  render() {
    let labelProperty = this.props.labelProperty;
    let valueProperty = this.props.valueProperty;
    let label = (value) => {
      if (!value) {
        return '';
      }
      return value[labelProperty] ? value[labelProperty] : value[valueProperty];
    };

    let value = '';
    if (this.state.value) {
      if (lodash.isArray(this.state.value)) {
        value = this.state.value.reduce((previousValue, currentValue) => {
          let val = label(currentValue);
          if (!previousValue) {
            return val;
          }
          return previousValue + '; ' + val;
        }, null);
      } else {
        value = label(this.state.value)
      }
    }

    return (
      <input readOnly={true}
        className="form-control"
        id={this.props.id}
        name={this.props.name}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        value={typeof value === 'undefined' ? '' : value}
      />
    );
  }
}
