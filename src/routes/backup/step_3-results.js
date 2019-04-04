import { inject } from 'aurelia-framework';

import LuzzuApiService from '../services/luzzu-api-service.js';
import DataStore from '../services/data-store.js';
import {Step_3} from './step_3.js';

@inject(LuzzuApiService, DataStore, Step_3)

export class Step3Results {
  
  constructor(LuzzuApiService, DataStore, Step_3) {
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    this.parent = Step_3;
    this.loading = true;
  }

  activate() {
    this.loading = true;
    //need to get results each time as the ranking can change
    return new Promise( (resolve, reject) => {

      let requestObj = this.dataStore.createResultRequestObject( this.parent.ranking );
      
      this.luzzuApiService.getResults(requestObj)
      .then( (resultData) => {
        console.log('step-3-results got results data from api');
      
        this.dataStore.setResults( resultData );
        this.parent.results = this.dataStore.getResults();
        resolve();
      });
    });
  }

  deactivate() {
    this.loading = true;
  }

  attached() {
    this.parent.changedSubView('results');
    this.loading = false;
  }
}