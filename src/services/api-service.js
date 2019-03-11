import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

// might need to install polyfill for fetch
// https://github.com/github/fetch
// https://aurelia.io/docs/plugins/http-services#aurelia-fetch-client

inject(HttpClient)

export default class ApiHelper {
  constructor(HttpClient) {
    this.httpClient = HttpClient;
  }
}