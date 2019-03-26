import { inject } from 'aurelia-framework';

import DataStore from '../services/data-store.js';
import {Step_3} from './step_3.js';

@inject(DataStore, Step_3)

export class Step3Results {
  
  constructor(DataStore, Step_3) {
    this.dataStore = DataStore;
    this.parent = Step_3;
    this.results = []; // should get populated in activate hook
  }

  attached() {
  }
}