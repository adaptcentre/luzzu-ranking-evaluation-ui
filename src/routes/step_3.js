import {inject, TaskQueue} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Router, TaskQueue)

export class Step_3 {
	
	constructor(Router, TaskQueue) {
    this.router = Router;
    this.taskQueue = TaskQueue
	}

	attached() {

    this.metrics = [];

    this.metrics.push({ id: 1, name: 'Metric-1', value: 20 });
    this.metrics.push({ id: 2, name: 'Metric-2', value: 40 });
    this.metrics.push({ id: 3, name: 'Metric-3', value: 50 });
    
    this.taskQueue.queueMicroTask(() => {            
      $(".js-range-slider").ionRangeSlider();       
    });
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