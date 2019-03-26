import { inject } from 'aurelia-framework';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(LuzzuApiService, DataStore)

export class Step2Ranking {
  
  constructor(LuzzuApiService, DataStore) {

    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
        
    this.ranking = []; // should get populated in activate hook
  }
  
  attached() {
    this.ranking = this.dataStore.getRanking();
  }
}