import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';

import taskDesc from 'raw-loader!../../static/content/task-2-desc.txt';
import questions from 'raw-loader!../../static/content/questions.txt';

@inject(Router, LuzzuApiService, DataStore, MongoStitchApiService)

export class Step_3 {
	
	constructor(Router, LuzzuApiService, DataStore, MongoStitchApiService) {
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.mongoStitchApiService = MongoStitchApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = []; // should get populated in activate hook
    this.dimensions = [];
    this.results = [];

    this.taskDesc = taskDesc;

    let tempQ = JSON.parse(questions);

    this.question = {
      header: tempQ['three'].header,
      text: tempQ['three'].text,
      answer: null,
      disabled: true
    }

    this.time = {
      start: null,
      end: null
    }
  }

  configureRouter(config, router, params) {
  		
		config.map([
			{ route: ['','ranking'],   name: 'ranking',  moduleId: PLATFORM.moduleName( 'routes/step_3-ranking') },
			{ route: 'results',   name: 'results',  moduleId: PLATFORM.moduleName( 'routes/step_3-results') }
    ]);
    
    this.childRouter = router;
	}
  
  
  activate() {
    /* 
      Here we need to make some api calls to get the ranking data
      and to get al list of all possible dimensions a user can add
    */

    let p1 = new Promise( (resolve, reject) => {

      this.luzzuApiService.getRanking()
        .then( (rankingData) => {
      
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getDimensions()
      .then( (dimensionsData) => {
        this.dataStore.setDimensions( dimensionsData );
        resolve();
      });
    });

    return Promise.all([p1, p2]);
  }

	attached() {
    this.reset();
    this.loading = false;
    this.time.start = Date.now();

    /*
    setTimeout( () => {
      for(let dim of this.ranking) {
        dim.value = 0;
      }

      let temp = JSON.parse( JSON.stringify( this.ranking ) );
      this.ranking = temp;
      console.log(this.ranking)
    }, 10000)
    */
  }
  

  changeDimension(event) {
    console.log('dimensions have changed');

    let changedDim = event.detail;

    console.log(changedDim);
    /*
    let total = 0;
    for( let ranking of this.ranking ) {
      total += ranking.value;
    }

    console.log('total', total)
    
    let difference = 100 - total;
    console.log('diff', difference);

    let remainingDims = this.ranking.filter( (el) => {
      return el.name !== changedDim.name;
    });

    remainingDims.sort( (a,b) => {
      return a.value - b.value;
    });

    let splitDiff = difference / remainingDims.length;
    console.log('splitDiff', splitDiff);
    let toMod = splitDiff;
    for( let remainingDim of remainingDims ) {
      let res = remainingDim.value + toMod;

      if(res < 0) {
        console.log('carry to next')
        toMod += res;
        remainingDim.value = 0;
        console.log('reset to 0:', remainingDim.name);
      } else {
        remainingDim.value += toMod
        console.log('adding', toMod, 'to:', remainingDim.name);
      }
      toMod += splitDiff;
    }

    this.ranking = JSON.parse( JSON.stringify( this.ranking) );

    let tt = 0;
    for(let r of this.ranking) {
      console.log(r.value)
      tt += r.value
    }
    console.log('--\n', tt);
    */
  }

  openModal() {
    $('#addDimensionModal').modal({});
  }

  changedSubView( from ) {
    console.log('changed subview');
    
    let time = Date.now();
    let output = '';

    if(from === 'ranking') {
      output = 'ranking to results';
    } else {
      output = 'results to ranking';
    }

    this.dataStore.changedSubView('step3', { 
      from: output, 
      time: time, 
      ranking: this.dataStore.createResultRequestObject(this.ranking) 
    });
  }

  //------

  removeDimensionFromRanking(event) {

    let name = event.detail;

    let index = this.ranking.findIndex( (el) => {
      return el.name === name;
    });
  
    this.ranking.splice(index, 1);
  }

  addDimensionsToRanking(event) {
    let dimensionsToAdd = event.detail;
    
    for(let dim of dimensionsToAdd) {
      let dimension = {
        name: dim.name,
        value: 0
      }

      this.ranking.push(dimension);
    }

    this.dimensions = this.filterDimensions( this.dataStore.getDimensions() );
  }

  reset() {
    this.ranking = this.dataStore.getRanking();
    this.dimensions = this.filterDimensions( this.dataStore.getDimensions() );
  }

  // need this so we cannot add the same ones twice
  filterDimensions( dimensions ) {

    return dimensions.filter( (el) => {
      
      let found = this.ranking.findIndex( (elm) => {
        return el.name === elm.name;
      });

      if(found === -1) {
        return true;
      }
      
      return false;
    });
  }

  //------

	next() {
    this.loading = true;
    
    this.dataStore.setUserDataTimeEnd();

    this.time.end = Date.now();
    
    this.dataStore.addQuestion('step3', JSON.parse( JSON.stringify(this.question) ) );
    this.dataStore.addRanking('step3', this.dataStore.createResultRequestObject(this.ranking) );
    this.dataStore.updateStep('step3', this.time);

    let userData = this.dataStore.getUserData();
    //we need to send data to DB before we move on
    this.mongoStitchApiService.sendResults(userData).then( (results) => {
      //this.dataStore.setParticipantId( participant_id );
      this.mainRouter.navigateToRoute('step_4');
    })
    
	}
}