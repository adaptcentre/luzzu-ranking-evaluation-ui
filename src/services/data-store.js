import { inject } from 'aurelia-framework';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(LuzzuApiService)

export default class DataStore {

  constructor(LuzzuApiService) {
    this.ranking = [];
    this.results = [];
    this.metrics= [];

    this.luzzuApiService = LuzzuApiService;
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

  getResults() {
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