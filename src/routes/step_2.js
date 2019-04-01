import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(Router, LuzzuApiService, DataStore)

// this.router.currentInstruction.fragment === 'ranking
// ${router.currentInstruction.fragment === ''ranking ? 'active' : ''}

export class Step_2 {
	
	constructor(Router, LuzzuApiService, DataStore) {
    
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = [];
    this.results = [];

    this.question = {
      header: 'Question header',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit?',
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
      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
          console.log('step-2 got ranking data from api');
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    // get dimension data
    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getDimensions()
      .then( (dimensionData) => {
        console.log('step-2 got dimension data from api');
        this.dataStore.setDimensions( dimensionData );
        resolve();
      });
    });

    // get standard result data
    let p3 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getResults()
      .then( (resultData) => {
        console.log('step-2 got results data from api');
        this.dataStore.setResults( resultData );
        resolve();
      });
    });

    return Promise.all([p1, p2, p3]);
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