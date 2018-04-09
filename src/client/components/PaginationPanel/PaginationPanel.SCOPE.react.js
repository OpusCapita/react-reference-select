import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

@showroomScopeDecorator
class PaginationPanelScope extends Component {
  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager({ locale: 'en' });
    }
    return { i18n: this.context.i18n };
  }

  render() {
    return (
      <div className="paginate" style={{ display: 'flex', alignItems: 'center' }}>
        {this._renderChildren()}
      </div>
    )
  }
}

PaginationPanelScope.contextTypes = {
  i18n: PropTypes.object
};
PaginationPanelScope.childContextTypes = {
  i18n: PropTypes.object
};

export default PaginationPanelScope;
