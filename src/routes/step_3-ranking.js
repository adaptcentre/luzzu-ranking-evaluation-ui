import { inject } from 'aurelia-framework';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import {Step_3} from './step_3.js';

// inject parent from child
// https://bl.ocks.org/opcodewriter/d8611c0f864e9017c05f37e30cd6c004

@inject(LuzzuApiService, DataStore, Step_3)

export class Step3Ranking {
  
  constructor(LuzzuApiService, DataStore, Step_3) {

    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;

    this.parent = Step_3;
  }

  attached() {
  }
}