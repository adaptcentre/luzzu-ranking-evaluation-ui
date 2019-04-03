import { inject } from 'aurelia-framework';
import RankingConverter from './ranking-converter.js';

@inject(RankingConverter)

export default class DataStore {

  constructor() {
    
    this.ranking = [];
    this.results = [];
    this.dimensions = [];

    // @toDo
    this.userData = {
      id: null,
      time: { start: null, end: null },
      step1: {
        time: { start: null, end: null }
      },
      step2a: {
        time: { start: null, end: null },
        question: null,
        ranking: null
      },
      step2b: {
        time: { start: null, end: null },
        question: null,
        results: null
      },
      step3: {
        time: { start: null, end: null },
        views: [],
        question: null
      }
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
    let output = JSON.parse( JSON.stringify( this.dimensions ) );

    output.sort( (a,b) => {
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });
    
    return output;
  }

  getDimensionsDesc( name ) {
    let res = this.dimensions.findIndex( (el) => { return el.name === name; } );
  
    if(res !== -1) {
      return this.dimensions[res].desc;
    }
  }

  createResultRequestObject( ranking ) {
    
    ranking = ranking || this.ranking;
    
    let result = [];
    
    for( let dimension of ranking ) {
      result.push({
        type: 'dimension',
        uri: this.getDimensionURI( dimension.name ),
        weight: dimension.value.toString()
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

  //--------

  setParticipantId( id ) {
    this.userData.id = id;
  }

  updateStep(step, time) {
    this.userData[step].time = time;
  }

  addQuestion( step, question ) {
    this.userData[step].question = question;
  }

  addRanking(step, ranking) {
    this.userData[step].ranking = ranking;
  }

  changedSubView(step, data) {
    this.userData[step].views.push( data );
  }

  getUserData() {
    return JSON.parse( JSON.stringify( this.userData ) );
  }

  setUserDataTimeStart() {
    this.userData.time.start = Date.now();
  }
  setUserDataTimeEnd() {
    this.userData.time.end = Date.now();
  }
}