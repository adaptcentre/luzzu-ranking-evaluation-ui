import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_1 {
	
	constructor(Router) {
		this.router = Router;
		this.consent_checked = false;
	}

	attached() {

	}

	next() {
		this.router.navigate('step_02', { from: 'step_01' } );
	}
}