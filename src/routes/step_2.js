import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_2 {
	
	constructor(Router) {
		this.router = Router;
	}

	attached() {

	}

	next(which) {

		if(which === 1) {
			this.router.navigateToRoute('step_3', { from: 'step_2', task: 1 } );
		}

		else if( which === 2 ) {
			this.router.navigateToRoute('step_3', { from: 'step_2', task: 2 } );
		}
		
	}
}