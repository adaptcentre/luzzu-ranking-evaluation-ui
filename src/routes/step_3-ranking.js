import { inject } from 'aurelia-framework';
import {Step_3} from './step_3.js';

// inject parent from child
// https://bl.ocks.org/opcodewriter/d8611c0f864e9017c05f37e30cd6c004

@inject(Step_3)

export class Step3Ranking {
  
  constructor(Step_3) {
    this.parent = Step_3;
    this.loading = true;
  }

  activate() {
    this.loading = true;
    

    return new Promise( (resolve) => {
      setTimeout( () => {
        resolve()
      },4000)
    })
    
  }

  deactivate() {
    this.loading = true;
  }

  attached() {
    this.parent.changedSubView();
    this.loading = false;
  }
}