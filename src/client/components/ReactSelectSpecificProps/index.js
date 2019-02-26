import PropTypes from 'prop-types';

export default {
  /**
  * The props 'key' was added for resolving issue (https://github.com/JedWatson/react-select/issues/1581).
  * Need to find a better solution in the future.
  */
  key: PropTypes.string,
  /**
  * The default set of options to show before the user starts searching; default to [].
  */
  options: PropTypes.array,
  /**
  * Automatically call the `loadOptions` prop on-mount; defaults to true.
  */
  autoload: PropTypes.bool,
  clearable: PropTypes.bool,
  onOpen: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string
}
