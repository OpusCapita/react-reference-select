import PropTypes from 'prop-types';

/**
 * The props 'key' was added for resolving issue (https://github.com/JedWatson/react-select/issues/1581).
 * Need to find a better solution in the future.
*/

export default {
  key: PropTypes.string,
  clearable: PropTypes.bool,
  onOpen: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string
}
