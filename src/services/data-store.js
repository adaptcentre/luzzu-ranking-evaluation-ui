import { inject } from 'aurelia-framework';
import RankingConverter from './ranking-converter.js';

@inject(RankingConverter)

export default class DataStore {

  constructor(RankingConverter) {
    
    this.converter = RankingConverter;

    this.ranking = [];
    this.results = [];
    this.dimensions = [];

    // @toDo
    this.userData = {
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

  setDimensions( dimensionsData ) {
    this.dimensions = dimensionsData;
  }

  getDimensions() {
    return JSON.parse( JSON.stringify( this.dimensions ) );
  }

  getDimensionsDesc( name ) {
    let res = this.dimensions.findIndex( (el) => { return el.name === name; } );
  
    if(res !== -1) {
      return this.dimensions[res].desc;
    }
  }

  createResultRequestObject( ranking ) {
    
    ranking = ranking || this.ranking;
    //first convert value to api value
    this.converter.convertOutgoing( ranking );

    let result = [];
    
    for( let dimension of ranking ) {
      result.push({
        type: 'dimension',
        uri: this.getDimensionURI( dimension.name ),
        weight: dimension.apiValue.toString()
      });
    }

    return result;
  }

  getDimensionURI(name) {
    
    let res = this.dimensions.findIndex( (el) => { return el.name === name; } );
  
    if(res !== -1) {
      return this.dimensions[res].uri;
    }
  }
}