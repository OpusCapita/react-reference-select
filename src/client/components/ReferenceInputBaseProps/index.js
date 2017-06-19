import React from 'react';

const ReferenceInputBaseProps = {
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  value: React.PropTypes.oneOfType(
    [
      React.PropTypes.array,
      React.PropTypes.object
    ]
  ),
  onChange: React.PropTypes.func,
  onFocus: React.PropTypes.func,
  onBlur: React.PropTypes.func,

  multiple: React.PropTypes.bool,
  readOnly: React.PropTypes.bool,
  disabled: React.PropTypes.bool
};

export default ReferenceInputBaseProps
