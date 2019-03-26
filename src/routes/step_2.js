import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(Router, LuzzuApiService, DataStore)

export class Step_2 {
	
	constructor(Router, LuzzuApiService, DataStore) {
    this.router = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.test = {
      text: "helllo",
      cool: () => {
        console.log(this.loading)
      }
    }
    this.loading = true;
    this.ranking = []; // should get populated in activate hook
    this.metrics = [];
  }
  
  activate() {
    /* 
      Here we need to make some api calls to get the ranking data
      and to get al list of all possible dimensions a user can add
    */

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
    this.reset();
  }
  
  removeMetricFromRanking(event) {

    let id = event.detail;

    let index = this.ranking.findIndex( (el) => {
      return el.id === id;
    });
  
    this.ranking.splice(index, 1);
  }

  openModal() {
    $('#addMetricModal').modal({});
  }

  addMetricToRanking(event) {
    let metricsToAdd = event.detail;
    
    for(let metricId of metricsToAdd) {
      let metric = {
        name: metricId.name,
        id: metricId.id,
        value: 0
      }

      this.ranking.push(metric);
    }

    this.metrics = this.filterMetrics( this.dataStore.getMetrics() );
  }

  reset() {
    this.ranking = this.dataStore.getRanking();
    this.metrics = this.filterMetrics( this.dataStore.getMetrics() );
  }

  debug() {
    

    this.luzzuApiService.sendRankingData( this.ranking )

    //console.table( temp );
  }

  // need this so we cannot add the same ones twice
  filterMetrics( metrics ) {

    return metrics.filter( (el) => {
      
      let found = this.ranking.findIndex( (elm) => {
        return el.id === elm.id;
      });

      if(found === -1) {
        return true;
      }
      
      return false;
    });
  }

	next() {
    this.loading = true;
    
    this.luzzuApiService.sendRankingData( this.ranking )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.router.navigateToRoute('step_3', { from: 'step_2' } );
      });
	}
}