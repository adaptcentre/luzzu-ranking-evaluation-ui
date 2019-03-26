import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(LuzzuApiService, DataStore)

// this.router.currentInstruction.fragment === 'ranking
// ${router.currentInstruction.fragment === ''ranking ? 'active' : ''}

export class Step_2 {
	
	constructor(LuzzuApiService, DataStore) {
    //this.router = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = [];
    this.results = [];
  }

  configureRouter(config, router, params) {
  		
		config.map([
			{ route: ['','ranking'],   name: 'ranking',  moduleId: PLATFORM.moduleName( 'routes/step_2-ranking') },
			{ route: 'results',   name: 'results',  moduleId: PLATFORM.moduleName( 'routes/step_2-results') }
    ]);
    
    this.router = router;
	}
  
  activate() {

    // populate dataStore

    // get ranking data
    let p1 = new Promise( (resolve, reject) => {

      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
      
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    // get metric data
    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getMetrics()
      .then( (metricData) => {
      
        this.dataStore.setMetrics( metricData );
        resolve();
      });
    });

    // get result data
    let p3 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getResults()
      .then( (resultData) => {
      
        this.dataStore.setResults( resultData );
        resolve();
      });
    });

    return Promise.all([p1,p2,p3]);
  }

	attached() {
    this.loading = false;

    this.ranking = this.dataStore.getRanking();
    this.results = this.dataStore.getResults();
  }
  
	next() {
    this.loading = true;
    
    setTimeout( () => {
      this.router.navigateToRoute('step_3', { from: 'step_2' } );
    }, 800);
    

    /*
    this.luzzuApiService.sendRankingData( this.ranking )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.router.navigateToRoute('step_3', { from: 'step_2' } );
      });
    */
	}
}