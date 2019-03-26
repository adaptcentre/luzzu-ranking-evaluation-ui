import { inject } from 'aurelia-framework';

import DataStore from '../services/data-store.js';

@inject(DataStore)

export class Step2Ranking {
  
  constructor(DataStore) {
    this.dataStore = DataStore;
        
    this.results = []; // should get populated in activate hook
  }

  attached() {
    this.results = this.dataStore.getResults();
  }
}