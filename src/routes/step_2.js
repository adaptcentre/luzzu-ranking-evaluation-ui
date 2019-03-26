import { inject } from 'aurelia-framework';
//import { Router } from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(LuzzuApiService, DataStore)

export class Step_2 {
	
	constructor(LuzzuApiService, DataStore) {
    //this.router = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.loading = true;
  }

  configureRouter(config, router, params) {
  		
		config.map([
			{ route: ['','ranking'],   name: 'ranking',  moduleId: PLATFORM.moduleName( 'routes/step_2-ranking') },
			{ route: 'results',   name: 'results',  moduleId: PLATFORM.moduleName( 'routes/step_2-ranking') }
    ]);
    
    this.router = router;
	}
  
  activate() {

    // populate dataStore

    let p1 = new Promise( (resolve, reject) => {

      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
      
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getMetrics()
      .then( (metricData) => {
      
        this.dataStore.setMetrics( metricData );
        resolve();
      });
    });

    return Promise.all([p1,p2]);
  }

	attached() {
    this.loading = false;
  }
  
	next() {
    this.loading = true;
    
    this.router.navigateToRoute('step_3', { from: 'step_2' } );

    /*
    this.luzzuApiService.sendRankingData( this.ranking )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.router.navigateToRoute('step_3', { from: 'step_2' } );
      });
    */
	}
}