import PropTypes from 'prop-types';
import React from 'react';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';

export default class ReadonlyInput extends React.Component {
  static propTypes = {
    ...ReferenceInputBaseProps,
    labelProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value === undefined ? null : props.value
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({ value: nextProps.value });
  }

  render() {
    const { labelProperty, valueProperty } = this.props;
    const label = (value) => {
      if (!value) {
        return '';
      }
      return value[labelProperty] ? value[labelProperty] : value[valueProperty];
    };

    let value = '';
    if (this.state.value) {
      if (Array.isArray(this.state.value)) {
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
        value={value === undefined || value === null ? '' : value + ''}
      />
    );
  }
}
