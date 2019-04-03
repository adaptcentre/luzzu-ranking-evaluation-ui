import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import {EventAggregator} from 'aurelia-event-aggregator';

import taskDesc from 'raw-loader!../../static/content/task-2-desc.txt';
import questions from 'raw-loader!../../static/content/questions.txt';

@inject(Router, LuzzuApiService, DataStore, MongoStitchApiService, EventAggregator)

export class Step_3 {
	
	constructor(Router, LuzzuApiService, DataStore, MongoStitchApiService, EventAggregator) {
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.mongoStitchApiService = MongoStitchApiService;
    this.dataStore = DataStore;
    this.eventAggregator = EventAggregator;
    
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

    // get ranking from API
    let p1 = new Promise( (resolve, reject) => {

      this.luzzuApiService.getRanking()
        .then( (rankingData) => {
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    // get dimension data from API
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
  }
  

  changeDimension(event) {
    //console.log('dimensions have changed');

    let changedDim = event.detail;

    //console.log(changedDim);
    //console.log(this.ranking)

    let currentTotal = this.ranking.reduce( (accumulator, currentElement) => {
      return accumulator + currentElement.value;
    }, 0);

    let difference = 1 - currentTotal;
    //console.log('total:', currentTotal, 'difference:', difference);

    let toAddToEachDim = difference / (this.ranking.length - 1);
    //console.log('have to add this to each:', toAddToEachDim);

    let filteredAndSorted = this.ranking.filter( (el) => {
      return el.name !== changedDim.name;
    })
    .sort( (a, b) => {
      return a.value - b.value;
    });

    //console.table(filteredAndSorted)

    let runningValue = toAddToEachDim;

    for( let dim of filteredAndSorted ) {
      let toCarry = 0;

      if(dim.value + runningValue < 0) {
        toCarry += dim.value + runningValue
        dim.value = 0;
      } else {
        dim.value += runningValue;
      }
      runningValue = toAddToEachDim + toCarry;
    }

    
    this.eventAggregator.publish('dimension-update-value', {});

    // DEBUG OUTPUT START!
    let newTotal = this.ranking.reduce( (accumulator, currentElement) => {
      return accumulator + currentElement.value;
    }, 0);

    let dubugOutput = JSON.parse( JSON.stringify( this.ranking ) );
    dubugOutput.push( { name: 'TOTAL', value: newTotal } )
    console.table( dubugOutput );
    // DEBUG OUTPUT END
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
    
    let removed = this.ranking.splice(index, 1);

    if(removed.length > 0) {
      console.log( 'Removed', removed[0].name, 'from ranking!' );

      // DEBUG OUTPUT START!
      let dubugOutput = JSON.parse( JSON.stringify( this.ranking ) );
      console.table( dubugOutput );
      // DEBUG OUTPUT END
    }
    
    this.dimensions = this.filterDimensions( this.dataStore.getDimensions() );
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

    // DEBUG OUTPUT START!
    console.log('RANKING AND DIMENSIONS RESET');
    console.log('DIMENSIONS');
    console.table( JSON.parse( JSON.stringify( this.dimensions ) ) );
    console.log('RANKING');
    console.table( JSON.parse( JSON.stringify( this.ranking ) ) );
    // DEBUG OUTPUT END!
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
    
    // DEBUG START
    console.log('\n\n SENDING STUFF TO DB');
    console.table( JSON.parse( JSON.stringify(this.ranking) ) );
    console.log('\n\n');
    // DEBUG END

    //we need to send data to DB before we move on
    this.mongoStitchApiService.sendResults(userData).then( (results) => {
      
      this.mainRouter.navigateToRoute('step_4');
    });

    //also need to send data to LUZZU API to update RANKING?
    
	}
}