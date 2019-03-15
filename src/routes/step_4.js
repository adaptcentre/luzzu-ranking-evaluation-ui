import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';

@inject(Router, DataStore)

export class Step_4 {
	
	constructor(Router, DataStore) {
		this.router = Router;
		this.loading = true;
		this.dataStore = DataStore;
	}

	activate( params ) {
		this.results = this.dataStore.getResults();
	}

	attached() {
		this.loading = false;
	}

	next() {
		this.loading = true;
		this.router.navigateToRoute('step_5', { from: 'step_4' } );
	}
}