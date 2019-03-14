

export default class DataStore {

  constructor() {
    this.metrics = [];
    this.results = [];
  }

  setMetrics( metrics ) {
    this.metrics = metrics;
  }

  getMetrics() {
    return JSON.parse( JSON.stringify( this.metrics ) );
  }

  setResults( results ) {
    this.results = results;
  }

  getResults( results ) {
    return JSON.parse( JSON.stringify( this.results ) );
  }
}