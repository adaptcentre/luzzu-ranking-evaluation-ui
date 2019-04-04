import { inject } from 'aurelia-framework';
import RankingConverter from './ranking-converter.js';

@inject(RankingConverter)

export default class DataStore {

  constructor() {
    
    this.ranking = [];
    this.dimensions = [];
    this.userSelectedDimensions = [];
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