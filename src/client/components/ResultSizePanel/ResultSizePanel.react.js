import React, { Component, PropTypes } from "react";
import Dropdown from "react-bootstrap/lib/Dropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
import translations from './i18n'

export default class ResultSizePanel extends Component {
  static propTypes = {
    /**
     * Pagination callback
     */
    onResize: PropTypes.func.isRequired
  };

  static contextTypes = {
    i18n: React.PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  constructor(props, context) {
    super(props, context);

    this.defaultDropdownState = {
      size: "10"
    };

    this.state = {
      ...this.defaultDropdownState
    };
  }

  componentWillMount() {
    this.context.i18n.register('ResultSizePanel', translations)
  }

  onSelect(eventKey, event) {
    if (eventKey) {
      this.setState(
        {
          size: eventKey === 'all' ? this.context.i18n.getMessage('ResultSizePanel.resultsPerPageAllLabel') : eventKey
        }
      );

      this.props.onResize(eventKey === 'all' ? Number.MAX_SAFE_INTEGER : parseInt(eventKey, 10));
    }
  }

  render() {
    return (
      <Dropdown id="dropdownMenu"
        dropup={true}
        onSelect={this.onSelect.bind(this)}
      >
        <Dropdown.Toggle>
          <span>{this.context.i18n.getMessage('ResultSizePanel.resultsPerPageLabel')}: <b>{this.state.size}</b></span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="text-right">
          <MenuItem eventKey="all">{this.context.i18n.getMessage('ResultSizePanel.resultsPerPageAllLabel')}</MenuItem>
          <MenuItem eventKey="1000">1000</MenuItem>
          <MenuItem eventKey="100">100</MenuItem>
          <MenuItem eventKey="50">50</MenuItem>
          <MenuItem eventKey="30">30</MenuItem>
          <MenuItem eventKey="10">10</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}
