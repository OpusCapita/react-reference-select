import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { loadObjectData } from './referenceInputUtils';

export default function refreshValueDecorator(keyProperty, labelProperty, refresh) {
  return (DecoratedComponent) => {
    return class extends React.Component {
      static defaultProps = {
        value: null
      };

      static propTypes = {
        value: PropTypes.oneOfType(
          [
            PropTypes.array,
            PropTypes.object
          ]
        ),
        serviceRegistry: PropTypes.func.isRequired
      };

      state = {
        value: this.props.value
      };

      componentDidMount() {
        this.load(this.props);
      }

      componentWillReceiveProps(nextProps, nextContext) {
        if (!lodash.isEqual(nextProps.value, this.props.value)) {
          this.setState({ value: nextProps.value });
          this.load(nextProps);
        }
      }

      load = (props) => {
        if (this.loadObjectDataPromise) {
          this.loadObjectDataPromise.cancel();
        }
        this.loadObjectDataPromise = loadObjectData(
          props.value,
          keyProperty,
          labelProperty,
          refresh(props.serviceRegistry, props)
        ).then((value) => {
          this.setState({ value })
        }).finally(() => {
          this.loadObjectDataPromise = null;
        });
      };

      render() {
        return (
          <DecoratedComponent {...this.props} value={this.state.value}/>
        );
      }
    };
  };
}
