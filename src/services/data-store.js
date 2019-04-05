import { inject } from 'aurelia-framework';
import RankingConverter from './ranking-converter.js';

@inject(RankingConverter)

export default class DataStore {

  constructor() {
    
    this.ranking = [];
    this.dimensions = [];
    this.userSelectedDimensions = [];

    this.userData = {};
  }

  clone(obj) {
    return JSON.parse( JSON.stringify( obj ) );
  }

  setRanking( ranking ) {
    this.ranking = this.clone( ranking );
  }

  getRanking() {
    return this.clone( this.ranking );
  }

  setResults( results ) {
    this.results = this.clone( results );
  }

  getResults() {
    return this.clone( this.results );
  }

  setDimensions( dimensions ) {
    this.dimensions = this.clone( dimensions );
  }

  getDimensions() {
    let output = this.clone( this.dimensions );

    //sort them alphabetically
    output.sort( (a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });
    
    return output;
  }

  setUserSelectedDimensions( userSelectedDimensions ) {
    this.userSelectedDimensions = this.clone( userSelectedDimensions );
  }
  
  getUserSelectedDimensions() {
    return this.clone( this.userSelectedDimensions );
  }

  createUpdateRankingObj( ranking ) {
    /*
      {
      “Accuracy”: 0.0,
      “Availability”: 0.2797,
      “Completeness”: 0.0,
      “Conciseness”: 0.4265,
      “Consistency”: 0.2938,
      “Documentation”: 0.0,
      “Interoperability”: 0.0,
      “Licensing”: 0.0,
      “Longevity”: 0.0,
      “Provenance”: 0.0,
      “Relevance”: 0.0,
      “Syntactic validity”: 0.0,
      “Timeliness”: 0.0,
      “Trustworthiness”: 0.0,
      “Understandability”: 0.0,
      “Versatility”: 0.0
      }
    */

    let res = {};

    for(let dim of this.dimensions) {
      res[dim.name] = 0.0;
    }

    for( let rank of ranking ) {
      res[rank.name] = rank.apiValue;
    }

    return res;
  }

  createResultRequestObject( ranking ) {
    
    ranking = ranking || this.ranking;
    
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

  getDimensionDescription( name ) {
    let res = this.dimensions.findIndex( (el) => { return el.name === name; } );
  
    if(res !== -1) {
      return this.dimensions[res].desc;
    }
  }


  //--------
  addDataToUserData(step, data) {
    this.userData[step] = data;
  }

  getUserData() {
    return this.clone( this.userData );
  }
}