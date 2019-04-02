import { inject } from 'aurelia-framework';
import {Step_2} from './step_2.js';

@inject(Step_2)

export class Step2Results {
  
  constructor(Step_2) {
    this.parent = Step_2;
  }

  attached() {
    this.parent.changedSubView( 'results' );
  }
}