import Promise from 'bluebird';
import examples from './examples';

const sort = {
  asc: (objects, prop) => objects.sort((a, b) => a[prop] < b[prop] ? -1 : 1),
  desc: (objects, prop) => objects.sort((a, b) => a[prop] < b[prop] ? 1 : -1)
}

export default class ExampleService {
  getExamples(params) {
    let items = [...examples.body];
    if (params.id || params.name) {
      if (params.id) {
        items = examples.body.filter((example) => {
          return example.id.indexOf(params.id) !== -1
        })
      }
      if (params.name) {
        if (items.length) {
          items = items.filter((example) => {
            return example.name.indexOf(params.name) !== -1
          });
        } else {
          items = examples.body.filter((example) => {
            return example.name.indexOf(params.name) !== -1
          });
        }
      }
    }

    if (params.sort) {
      items = sort[params.order || 'asc'](items, params.sort)
    }

    if (params.q) {
      items = items.filter(item => item.name.toLowerCase().indexOf(params.q.toLowerCase()) !== -1);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          "body": items,
          "headers": {
            "content-range": `items 0-9/${items.length}`
          }
        });
      }, 500)
    });
  }
}
