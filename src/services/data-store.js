

export default class DataStore {

  constructor() {
    this.ranking = [];
    this.results = [];
    this.metricData = [];
  }

  setRanking( ranking ) {
    this.ranking = ranking;
  }

  getRanking() {
    return JSON.parse( JSON.stringify( this.ranking ) );
  }

  setResults( results ) {
    this.results = results;
  }

  getResults( results ) {
    return JSON.parse( JSON.stringify( this.results ) );
  }

  setMetricData(metricData) {
    this.metricData = metricData;
  }

  getMetricData() {
    return JSON.parse( JSON.stringify( this.metricData ) );
  }
}