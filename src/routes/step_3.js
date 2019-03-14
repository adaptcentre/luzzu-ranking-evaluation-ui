import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(Router, LuzzuApiService, DataStore)

export class Step_3 {
	
	constructor(Router, LuzzuApiService, DataStore) {
    this.router = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.loading = true;
    this.metrics = []; // should get populated in activate hook
  }
  
  activate() {
    /* 
      Here we need to make some api calls to get the ranking data
      and to get al list of all possible dimensions a user can add
    */

    return new Promise( (resolve, reject) => {

      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
      
          this.dataStore.setMetrics( rankingData );
          resolve();
        })

    });
  }

	attached() {
    this.loading = false;
    this.reset();
  }
  
  remove(event) {

    let id = event.detail;

    let index = this.metrics.findIndex( (el) => {
      return el.id === id;
    });
  
    this.metrics.splice(index, 1);
  }

  add() {

  }

  reset() {
    this.metrics = this.dataStore.getMetrics();
  }

	next() {
    this.loading = true;
    
    this.luzzuApiService.sendRankingData( this.metrics )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.router.navigateToRoute('step_4', { from: 'step_3' } );
      });
	}
}