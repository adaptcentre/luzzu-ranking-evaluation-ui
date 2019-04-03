import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import SinglePass from '../services/single-pass.js';

@inject(Router, SinglePass)

export class Step_4 {
	
	constructor(Router, SinglePass) {
		this.router = Router;
		this.loading = true;

		this.singlePass = SinglePass;
	}

	activate( params ) {

		// if we did not come from step 1 then naviagte back to step 1 to force reload
    if( !this.singlePass.checkLastEntry('step_3') ) {
			this.mainRouter.navigate('step_1');
    }

		this.singlePass.add('step_4');
	}

	attached() {
		this.loading = false;
	}
}