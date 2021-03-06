import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

@showroomScopeDecorator
class ReferenceSearchInputScope extends Component {
  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager({ locale: 'en' });
    }
    return { i18n: this.context.i18n };
  }

  render() {
    return (
      <div>
        {this._renderChildren()}
      </div>
    )
  }
}

ReferenceSearchInputScope.contextTypes = {
  i18n: PropTypes.object
};
ReferenceSearchInputScope.childContextTypes = {
  i18n: PropTypes.object
};

export default ReferenceSearchInputScope;
