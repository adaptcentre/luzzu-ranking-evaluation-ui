import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_1 {
	
	constructor(Router) {
		this.router = Router;
		this.consent_checked = false;
	}

	attached() {
		console.log(this.router)
	}

	next() {
		this.router.navigateToRoute('step_3', { from: 'step_1' } );
	}
}