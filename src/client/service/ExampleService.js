export default class ExampleService {

  examples = {
    "body": [
      {
        "id": "1",
        "name": "example1",
        "_objectLabel": "example1"
      },
      {
        "id": "2",
        "name": "example2",
        "_objectLabel": "example2"
      },
      {
        "id": "3",
        "name": "example3",
        "_objectLabel": "example3"
      }
    ],
    "headers": {
      "content-range": "items 0-2/3"
    }
  };


  getExamples(params) {
    if (params.id || params.name) {
      let items = [];
      if (params.id) {
        items = this.examples.body.filter((example) => {
          return example.id.includes(params.id)
        })
      }
      if (params.name) {
        if (items.length) {
          items = items.filter((example) => {
            return example.name.includes(params.name)
          });
        } else {
          items = this.examples.body.filter((example) => {
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
    return Promise.resolve(this.examples)
  }
}
