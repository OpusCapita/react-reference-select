import examples from './examples'

export default class ExampleService {
  getExamples(params) {
    if (params.id || params.name) {
      let items = [];
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
      return Promise.resolve({
        "body": items,
        "headers": {
          "content-range": `items 0-9/${items.length}`
        }
      })
    }
    return Promise.resolve(examples)
  }
}
