jest.autoMockOff();

const loadObjectData = require('../referenceInputUtils').loadObjectData;
const lodash = require('lodash');

const testData = [
  {
    "id": "jcadmin",
    "firstName": "",
    "surname": "Admin",
    "_objectLabel": "jcadmin (Admin)"
  },
  {
    "id": "Ernst.Einkauf",
    "firstName": "Ernst",
    "surname": "Einkauf",
    "_objectLabel": "Ernst.Einkauf (Einkauf)"
  }
];

function testObjectLoader(userId) {
  return new Promise((resolve, reject) => {
    let user = lodash.find(testData, (dataItem) => {
      return dataItem.id === userId;
    });
    process.nextTick(
      () => lodash.isUndefined(user) ? reject(404) : resolve({ body: user })
    );
  });
}

const testLabelProperty = '_objectLabel';
const testKeyProperty = 'id';

describe('referenceInputUtils', () => {
  it('loading existing object', () => {
    let isLoading = false;
    return loadObjectData(
      { id: 'jcadmin' },
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      () => {isLoading = true;},
      () => {isLoading = false;}
    ).then((dataObject) => {
      expect(lodash.eq(dataObject, lodash.find(testData, (dataItem) => dataItem.id === 'jcadmin'))).toBeTruthy();
      expect(isLoading).toBeFalsy();
    })
  });

  it('test skipping loading', () => {
    let testObject = { id: 'testId', _objectLabel: 'test_label' };
    return loadObjectData(
      testObject,
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.eq(dataObject, testObject)).toBeTruthy();
    })
  });


  it('test id-fallback logic', () => {
    let testObject = { id: 'testId' };
    return loadObjectData(
      testObject,
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(dataObject[testLabelProperty]).toBe(dataObject[testKeyProperty]);
      expect(dataObject[testLabelProperty]).toBe(testObject[testKeyProperty]);
      expect(dataObject[testKeyProperty]).toBe(testObject[testKeyProperty]);
    })
  });


  it('test empty object fallback', () => {
    return loadObjectData(
      {},
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.isEmpty(dataObject) && lodash.isObject(dataObject)).toBeTruthy();
    })
  });

  it('test null object fallback', () => {
    return loadObjectData(
      null,
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.isNull(dataObject)).toBeTruthy();
    })
  });

  it('test loading multiple objects', () => {
    return loadObjectData(
      [{ id: 'jcadmin' }, { id: 'Ernst.Einkauf' }],
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.size(dataObject)).toBe(2);
      expect(lodash.eq(dataObject[0], testData[0])).toBeTruthy();
      expect(lodash.eq(dataObject[1], testData[1])).toBeTruthy();
    })
  });

  it('test loading multiple objects of mixed type (valid and invalid)', () => {
    return loadObjectData(
      [{ id: 'jcadmin' }, { id: 'test' }],
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.size(dataObject)).toBe(2);
      expect(lodash.eq(dataObject[0], testData[0])).toBeTruthy();
      expect(dataObject[1][testKeyProperty]).toBe('test');
      expect(dataObject[1][testLabelProperty]).toBe('test');
    })
  });

  it('test loading multiple objects with empty array', () => {
    return loadObjectData(
      [],
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.size(dataObject)).toBe(0);
      expect(lodash.isArray(dataObject)).toBeTruthy();
      expect(lodash.isEmpty(dataObject)).toBeTruthy();
    })
  });

  it('tests if array that consist of 2 empty objects is passed then array with empty 2 objects is returned', () => {
    return loadObjectData(
      [{}, {}],
      testKeyProperty,
      testLabelProperty,
      testObjectLoader,
      lodash.noop,
      lodash.noop
    ).then((dataObject) => {
      expect(lodash.size(dataObject)).toBe(2);
      expect(lodash.isEmpty(dataObject[0]) && lodash.isObject(dataObject[0])).toBeTruthy();
      expect(lodash.isEmpty(dataObject[1]) && lodash.isObject(dataObject[1])).toBeTruthy();
    });
  });
});
