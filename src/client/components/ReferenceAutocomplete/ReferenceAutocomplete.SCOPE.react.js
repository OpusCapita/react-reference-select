import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

@showroomScopeDecorator
class ReferenceAutocompleteScope extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager('en', {});
    }
    return { i18n: this.context.i18n };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    )
  }
}

ReferenceAutocompleteScope.contextTypes = {
  i18n: PropTypes.object
};
ReferenceAutocompleteScope.childContextTypes = {
  i18n: PropTypes.object
};

export default ReferenceAutocompleteScope;
