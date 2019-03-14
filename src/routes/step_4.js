import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_4 {
	
	constructor(Router) {
		this.router = Router;
		this.loading = true;
	}

	activate( params ) {
		console.log(params);
			
	}

	attached() {
		this.loading = false;
	}

	next() {
		this.loading = true;
		this.router.navigateToRoute('step_5', { from: 'step_4' } );
	}
}