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
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,

  multiple: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,

  sort: PropTypes.string,
  order: PropTypes.string
};

export default ReferenceInputBaseProps
