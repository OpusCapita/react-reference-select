import request from "superagent-bluebird-promise";

export default class ExampleService {
  constructor(serviceUrl) {
    this._exampleServiceUrl = `${serviceUrl}/api/examples`;
  }

  getExamples(params) {
    return request.get(this._exampleServiceUrl).query(params).set('Accept', 'application/json');
  }

  getExample(id) {
    return request.
    get(`${this._exampleServiceUrl}/${encodeURIComponent(id)}`).
    set('Accept', 'application/json');
  }
}
