import PropTypes from 'prop-types';
import React from 'react';
import ReferenceInputBaseProps from '../ReferenceInputBaseProps';
import ReferenceSearchDialogProps from '../ReferenceSearchDialogProps';
import ReadonlyInput from './ReadonlyInput.react';
import Button from 'react-bootstrap/lib/Button';
import ReferenceSearchDialog from '../ReferenceSearchDialog';
import './styles.less';

import lodash from 'lodash';

export default
class ReferenceSearchInput extends React.Component {
  static propTypes = {
    ...ReferenceInputBaseProps,
    ...ReferenceSearchDialogProps,
    referenceSearchAction: PropTypes.func.isRequired,
    labelProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    modalSpecificProps: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    readOnly: false,
    multiple: false,
    modalSpecificProps: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      value: lodash.isUndefined(props.value) ? null : props.value,
      openDialog: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      if (this.props.value !== nextProps.value) {
        this.setState({ value: nextProps.value });
      }
    } else {
      this.setState({ value: this.props.multiple ? [] : null });
    }
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleReferenceSelect(selectedItems) {
    if (this.props.multiple) {
      this.handleValueChange(selectedItems);
    } else {
      this.handleValueChange(selectedItems[0]);
    }
  }

  handleValueChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value ? value : (this.props.multiple ? [] : null));
    }
    this.setState({ value });
  };

  openReferenceSearch() {
    this.setState({ openDialog: true });
  }

  render() {
    let childProps = lodash.pick(this.props,
      ['id', 'name', 'onFocus', 'onBlur', 'multiple', 'labelProperty', 'valueProperty', 'readOnly']
    );

    childProps.value = this.state.value;
    childProps.onChange = this.handleValueChange;

    let children;
    if (this.props.children) {
      childProps.readOnly = this.props.readOnly;
      childProps.disabled = this.props.disabled;

      let element = React.Children.only(this.props.children);
      children = React.cloneElement(element, childProps);
    } else {
      children = (<ReadonlyInput {... childProps}/>);
    }

    return (
      <div className="input-group jc-reference-search-input">
        <ReferenceSearchDialog
          openDialog={this.state.openDialog}
          referenceSearchAction={this.props.referenceSearchAction}
          onCloseDialog={this.handleCloseDialog}
          onSelect={(selectedItems) => this.handleReferenceSelect(selectedItems)}
          title={this.props.title}
          multiple={this.props.multiple}
          searchFields={this.props.searchFields}
          resultFields={this.props.resultFields}
          objectIdentifier={this.props.valueProperty}
          modalSpecificProps={this.props.modalSpecificProps}
        />
      {children}
        <div className="input-group-btn">
          <Button onClick={() => this.openReferenceSearch()} disabled={this.props.disabled || this.props.readOnly}>
            <i className="glyphicon glyphicon-search" />
          </Button>
        {!this.props.children ? (
          <Button
            onClick={() => this.handleValueChange(this.props.multiple ? [] : null)}
            disabled={this.props.disabled || this.props.readOnly}
          >
            <i className="glyphicon glyphicon-remove" />
          </Button>
        ) : null}
        </div>
      </div>
    );
  }
}
