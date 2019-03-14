import {inject, TaskQueue} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(Router, TaskQueue, LuzzuApiService)

export class Step_3 {
	
	constructor(Router, TaskQueue, LuzzuApiService) {
    this.router = Router;
    this.taskQueue = TaskQueue;
    this.luzzuApiService = LuzzuApiService;

    this.data = []; // should get populated in actived hook
  }
  
  activate() {
    /* 
      Here we need to make some api calls to get the ranking data
      and to get al list of all possible dimensions a user can add
    */

    return new Promise( (resolve, reject) => {

      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
          
          this.data = rankingData;
          resolve();
        })

    });
  }

	attached() {

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
    this.metrics = [];

    for( let item of this.data ) {
      this.metrics.push( JSON.parse( JSON.stringify(item) ) );
    }
  }

	next() {

    this.luzzuApiService.sendRankingData( this.metrics );
    
    //this.router.navigateToRoute('step_4', { from: 'step_3' } );
	}
}