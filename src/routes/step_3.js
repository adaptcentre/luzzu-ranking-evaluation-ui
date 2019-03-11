import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Step_3 {
	
	constructor(Router) {
		this.router = Router;
	}

	attached() {

    this.metrics = [];

    this.metrics.push({ id: 1, name: 'metric-1', value: 20 });
    this.metrics.push({ id: 2, name: 'metric-2', value: 40 });
    this.metrics.push({ id: 3, name: 'metric-3', value: 50 });

	}

	next(which) {

		if(which === 1) {
			this.router.navigateToRoute('step_4', { from: 'step_3', task: 1 } );
		}

		else if( which === 2 ) {
			this.router.navigateToRoute('step_4', { from: 'step_3', task: 2 } );
		}
		
	}
}