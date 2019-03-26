import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_1 {
	
	constructor(Router) {
		this.router = Router;
		this.consent_checked = false;
		this.loading = true;
	}

	attached() {
		this.loading = false;
	}

	next() {
		this.loading = true;
		this.router.navigateToRoute('step_2', { from: 'step_1' } );
	}
}