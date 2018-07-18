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
          return example.id.includes(params.id)
        })
      }
      if (params.name) {
        if (items.length) {
          items = items.filter((example) => {
            return example.name.includes(params.name)
          });
        } else {
          items = examples.body.filter((example) => {
            return example.name.includes(params.name)
          });
        }
      }
    }

    if (params.sort) {
      items = sort[params.order || 'asc'](items, params.sort)
    }

    return Promise.resolve({
      "body": items,
      "headers": {
        "content-range": `items 0-9/${items.length}`
      }
    })
  }
}
