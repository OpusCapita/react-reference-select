import _ from 'lodash';
import Promise from 'bluebird'

// add cancelation support otherwise refreshValueDecorator will not be able to perform calcelling
Promise.config({
  cancellation: true
});

/**
 * If object doesn't have  object[labelPropery] -> returns object with [labelProperty] = object[keyProperty]
 *
 * @param object
 * @param keyProperty
 * @param labelProperty
 * @returns object
 * @private
 */
function _getObjectWithFallback(object, keyProperty, labelProperty) {
  if (_.hasIn(object, labelProperty)) {
    return object;
  } else if (Array.isArray(keyProperty)) {
    let labelPropertyValue = '';
    keyProperty.forEach((key) => {
      if (_.hasIn(object, key)) {
        labelPropertyValue += `${_.get(object, key)} `
      }
    });
    return labelPropertyValue ? _.assignIn({}, object, { [labelProperty]: labelPropertyValue }) : object;
  } else {
    if (_.hasIn(object, keyProperty)) {
      // in case when key property is defined then we overwrite label property value
      return _.assignIn({}, object, { [labelProperty]: _.get(object, keyProperty) });
    } else {
      return object;
    }
  }
}

/**
 * If object has [labelProperty] -> object
 * else load object from enpoint
 * if result has [labelProperty] -> return result
 * else return fallback
 *
 * @param object
 * @param keyProperty
 * @param labelProperty
 * @param objectLoader
 * @returns {*}
 * @private
 */
function _loadSingleObject(object, keyProperty, labelProperty, objectLoader) {
  let keyValues = [];
  if (_.hasIn(object, labelProperty)) {
    // label exists -> return object as it is
    return Promise.resolve(object);
  } else if (Array.isArray(keyProperty)) {
    keyValues = keyProperty.map((key) => { return _.get(object, key) });
  } else {
    if (_.get(object, keyProperty) === undefined) {
      // key property is not specified -> return object as it is
      return Promise.resolve(object);
    } else {
      keyValues = [_.get(object, keyProperty)];
    }
  }
  return objectLoader(...keyValues).then((response) => {
    return _getObjectWithFallback(response.body, keyProperty, labelProperty)
  }).catch((error) => {
    return _getObjectWithFallback(object, keyProperty, labelProperty)
  })
}

/*
 * Loads object(s) from endpoint or falls back to object[labelProperty] -> object[keyProperty]
 *
 * @param object or array of objects
 * @param keyProperty unique identifier, f.e. supplierId
 * @param labelProperty object ui property name f.e. _objectLabel
 * @param objectLoader function that takes unique identifier as an argument and return Promise with loaded object
 * @param onLoadingStart function that handles loading start
 * @param onLoadingEnd function that handles loading end
 * @returns {*}
 */
function loadObjectData(object, keyProperty, labelProperty, objectLoader,
  onLoadingStart = () => {}, onLoadingEnd = () => {}) {
  if (_.isNil(object)) {
    return Promise.resolve(object);
  }
  // is multiple
  if (_.isArray(object)) {
    const someObjectHasNoLabel = _.some(object, (item) => {
      return !_.hasIn(item, labelProperty);
    });

    if (someObjectHasNoLabel) {
      onLoadingStart();
      return Promise.all(
        _.map(object, (item) => {
          return _loadSingleObject(item, keyProperty, labelProperty, objectLoader);
        })
      ).then((responses) => {
        onLoadingEnd();
        return _.map(responses, (response) => {
          return _getObjectWithFallback(response, keyProperty, labelProperty);
        });
      });
    } else {
      return Promise.resolve(object);
    }
  } else {
    onLoadingStart();
    return _loadSingleObject(object, keyProperty, labelProperty, objectLoader).then((result) => {
      onLoadingEnd();
      return result;
    });
  }
}

/*
 * Parses Content-range header and returns response count
 */
function getTotalCount(response) {
  let range = response.headers['content-range'];
  let index = range.indexOf('/');
  let totalCount = range.substring(index + 1);
  return parseInt(totalCount, 10);
}

export {
  getTotalCount,
  loadObjectData
};
