import lodash from "lodash";

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  const propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  const propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

function checkServiceName(propName, fn, serviceName) {
  let result = fn(serviceName);

  if (!(lodash.isObject(result) && lodash.isString(result.url))) {
    throw new Error(`Invalid props '${propName}' can't configure serviceRegistry for service name '${serviceName}'`)
  }
}

export default function(services) {
  return function(props, propName, componentName) {
    let fn = props[propName];
    if (fn) {
      if (lodash.isFunction(fn)) {
        if (lodash.isArray(services)) {
          for (let i = 0; i < services.length; i++) {
            checkServiceName(propName, fn, services[i]);
          }
        } else {
          checkServiceName(propName, fn, services);
        }
      } else {
        const preciseType = getPreciseType(fn);
        throw new Error(`Invalid props '${propName}' of type '${preciseType}'
          supplied to '${componentName}', expected 'function'.`);
      }
    } else {
      throw new Error('Required props `' + propName + '` was not specified in ' + ('`' + componentName + '`.'));
    }
  }
}
