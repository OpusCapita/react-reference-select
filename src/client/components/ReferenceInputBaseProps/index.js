import PropTypes from 'prop-types';

const ReferenceInputBaseProps = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType(
    [
      PropTypes.array,
      PropTypes.object
    ]
  ),
  labelProperty: PropTypes.string,
  valueProperty: PropTypes.string,

  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  multiple: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ReferenceInputBaseProps
