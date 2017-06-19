import React, { Component } from 'react';
import { showroomScopeDecorator } from '@opuscapita/react-showroom-client';

@showroomScopeDecorator
class SortableColumnScope extends Component {
  render() {
    const tableStyle = {
      border: '1px solid black'
    };
    return (
      <div>
        <table>
          <thead>
            <tr>
              <td>{this._renderChildren()}</td>
              <td>Unsortable column</td>
            </tr>
          </thead>
          <tbody style={tableStyle}>
            <tr>
              <td>1</td>
              <td>A</td>
            </tr>
            <tr>
              <td>2</td>
              <td>B</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default SortableColumnScope;
