import PropTypes from 'prop-types';

export default {
  /**
  * The props 'key' was added for resolving issue (https://github.com/JedWatson/react-select/issues/1581).
  * Need to find a better solution in the future.
  */
  key: PropTypes.string,
  /**
  * If cacheOptions is truthy, then the loaded data will be cached. The cache
  * will remain until `cacheOptions` changes value.
  */
  cacheOptions: PropTypes.bool,
  clearable: PropTypes.bool,
  onOpen: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string
}
