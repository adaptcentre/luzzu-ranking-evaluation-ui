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

    this.data = [];

    this.data.push({ id: 1, name: 'Metric-1', value: 20 });
    this.data.push({ id: 2, name: 'Metric-2', value: 40 });
    this.data.push({ id: 3, name: 'Metric-3', value: 50 });

    
    this.reset();

    //http://ionden.com/a/plugins/ion.rangeSlider/api.html

    //this.taskQueue.queueMicroTask(() => {            
    //  $(".js-range-slider").ionRangeSlider();       
    //});
  }
  
  remove(event) {

    let id = event.detail;

    let index = this.metrics.findIndex( (el) => {
      return el.id === id;
    });
  
    this.metrics.splice(index, 1);
  }

  add() {

  }

  reset() {
    this.metrics = [];

    for( let item of this.data ) {
      this.metrics.push( JSON.parse( JSON.stringify(item) ) );
    }
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