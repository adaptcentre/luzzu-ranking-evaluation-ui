import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_4 {
	
	constructor(Router) {
		this.router = Router;
	}

	attached() {
	}

	next() {
		this.router.navigateToRoute('step_5', { from: 'step_4' } );
	}
}