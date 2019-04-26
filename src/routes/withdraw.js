import { inject } from 'aurelia-framework';
import {Router} from 'aurelia-router';

import SinglePass from '../services/single-pass.js';

@inject(Router, SinglePass)

export default class Step_4 {
  constructor(Router, SinglePass) {
    
    this.mainRouter = Router;
    this.singlePass = SinglePass;
  
    this.loading = true; 
  }

  activate() {

    // if we did not come from step 1 then naviagte back to step 1 to force reload
    if( !this.singlePass.checkLastEntry('step_6') ) {
      this.mainRouter.navigate('step_1');
      return;
    }
    
    this.singlePass.add('withdraw');

  }

  attached() {
    window.scrollTo(0,0);
    this.loading = false;
  }
}
