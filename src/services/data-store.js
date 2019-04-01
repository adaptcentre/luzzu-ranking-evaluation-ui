import { inject } from 'aurelia-framework';

export default class DataStore {

  constructor(LuzzuApiService) {
    this.ranking = [];
    this.results = [];
    this.dimensions= [];

    // @toDo
    this.results = {
      id: null,
      step1: {},
      step2: {},
      step3: {}
    }
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

  setDimensions(dimensionsData) {
    this.dimensions = dimensionsData;
  }

  getDimensions() {
    return JSON.parse( JSON.stringify( this.dimensions ) );
  }

  getDimensionsDesc( id ) {
    let res = this.dimensions.findIndex( (el) => { return el.id === id; } );

    if(res !== -1) {
      return this.dimensions[res].desc;
    }
  }
}