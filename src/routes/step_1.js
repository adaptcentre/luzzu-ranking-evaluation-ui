import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import evaluationDesc from 'raw-loader!../../static/evaluation-desc.txt';
import consentFormHTML from 'raw-loader!../../static/consentform.txt';

import DataStore from '../services/data-store.js';

@inject(Router, DataStore)

export class Step_1 {
	
	constructor(Router, DataStore) {
		this.router = Router;
		this.consent_checked = false;
		this.loading = true;

		this.dataStore = DataStore;
		this.consentFormHTML = consentFormHTML;
		this.evaluationDesc = evaluationDesc;

		this.time = {
			start: null,
			end: null
		}
	}

	attached() {
		this.loading = false;

		this.time.start = Date.now();
		this.dataStore.setUserDataTimeStart();
	}

	next() {
		this.loading = true;
		//this.router.navigateToRoute('ranking');

		this.time.end = Date.now();
		this.dataStore.updateStep('step1', this.time);

		this.router.navigate('step_2/ranking');
	}
}