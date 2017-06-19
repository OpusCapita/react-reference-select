jest.autoMockOff();

const Promise = require('bluebird');
const React = require('react');
const enzyme = require('enzyme');
const refreshValueDecorator = require('../refreshValueDecorator.react').default;

const load = () => {
  return (statusId) => {
    return new Promise((resolve, reject) => {
      if (statusId === '100') {
        setTimeout(() => {
          resolve({ body: { statusId } });
        }, 1000)
      } else {
        resolve({ body: { statusId } });
      }
    })
  }
};

class MyComponent extends React.Component {
  render() {
    return (
      // eslint-disable-next-line react/prop-types
      <div>{ this.props.value && this.props.value.statusId }</div>
    );
  }
}

const WrappedMyComponent = refreshValueDecorator('statusId', '_objectLabel', load)(MyComponent);

describe('refreshValueDecorator', () => {
  let componentTree;

  beforeEach(function() {
    componentTree = enzyme.mount(
      <WrappedMyComponent
        serviceRegistry={() => ({ url: 'testUrl' })}
        value={ { statusId: '100' } }
      />
    );
  });

  it('test update value', () => {
    expect(componentTree.find('MyComponent')).toBeDefined();
    componentTree.setProps({ value: { statusId: '400' } });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    }).
    then(() => {
      expect(componentTree.state().value.statusId).toEqual('400')
    });
  });
});
