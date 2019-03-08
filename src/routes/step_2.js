import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_2 {
	
	constructor(Router) {
		this.router = Router;
	}

	attached() {

	}

	next() {
		this.router.navigateToRoute('step_3', { from: 'step_2' } );
	}
}