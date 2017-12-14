import React, { Component, PropTypes } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';
import { I18nManager } from '@opuscapita/i18n';

@showroomScopeDecorator
class ResultSizePanelScope extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false }
  }

  getChildContext() {
    if (!this.context.i18n) {
      this.context.i18n = new I18nManager('en', null, {});
    }
    return { i18n: this.context.i18n };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
        <div>
          <button onClick={this.toggleModal.bind(this)}>
            Open modal
          </button>
          {this._renderChildren()}
        </div>
    )
  }
}

ResultSizePanelScope.contextTypes = {
  i18n: PropTypes.object
};
ResultSizePanelScope.childContextTypes = {
  i18n: PropTypes.object
};

export default ResultSizePanelScope;
