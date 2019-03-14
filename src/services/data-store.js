

export default class DataStore {

  constructor() {
    this.ranking = [];
    this.results = [];
    this.metrics= [];
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

  setMetrics(metricData) {
    this.metrics = metricData;
  }

  getMetrics() {
    return JSON.parse( JSON.stringify( this.metrics ) );
  }

  getMetricDesc( id ) {
    let res = this.metrics.findIndex( (el) => { return el.id === id; } );

    if(res !== -1) {
      return this.metrics[res].desc;
    }

  }
}