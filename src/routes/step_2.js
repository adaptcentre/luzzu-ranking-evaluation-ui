import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';

import taskDesc from 'raw-loader!../../static/task-1-desc.txt';
import questions from 'raw-loader!../../static/questions.txt';

@inject(Router, LuzzuApiService, MongoStitchApiService, DataStore)

// this.router.currentInstruction.fragment === 'ranking
// ${router.currentInstruction.fragment === ''ranking ? 'active' : ''}

export class Step_2 {
	
	constructor(Router, LuzzuApiService, MongoStitchApiService, DataStore) {
    
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.mongoStitchApiService = MongoStitchApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = [];
    this.results = [];

    this.taskDesc = taskDesc;

    let tempQ = JSON.parse(questions);

    this.question = {
      header: tempQ['one'].header,
      text: tempQ['one'].text,
      answer: null,
      disabled: true
    }
  }

  configureRouter(config, router, params) {
  		
		config.map([
			{ route: ['','ranking'],   name: 'ranking',  moduleId: PLATFORM.moduleName( 'routes/step_2-ranking') },
			{ route: 'results',   name: 'results',  moduleId: PLATFORM.moduleName( 'routes/step_2-results') }
    ]);
    
    this.childRouter = router;
	}
  
  activate() {

    // get ranking data
    let p1 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getRanking()
        .then( (rankingData) => {
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    // get dimension data - need this for descriptios
    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getDimensions()
      .then( (dimensionData) => {
        this.dataStore.setDimensions( dimensionData );
        resolve();
      });
    });
    
    // get standard result data
    let p3 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getResults()
      .then( (resultData) => {
        this.dataStore.setResults( resultData );
        resolve();
      });
    });

    let p4 = new Promise( (resolve, reject) => {
      this.mongoStitchApiService.initSession().then( () => {
        resolve();
      })
    });
    
    
    return Promise.all([p1, p2, p3, p4]);
  }

	attached() {
    this.loading = false;

    this.ranking = this.dataStore.getRanking();
    this.results = this.dataStore.getResults();
  }

  changedSubView() {
    console.log('changed subview');
  }
  
	next() {
    this.loading = true;
    
    this.mainRouter.navigate('step_3/ranking')
    

    /*
    this.luzzuApiService.sendRankingData( this.ranking )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.router.navigateToRoute('step_3', { from: 'step_2' } );
      });
    */
  }
}