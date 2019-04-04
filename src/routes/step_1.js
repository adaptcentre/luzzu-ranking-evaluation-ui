import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import stepDescription from 'raw-loader!../../static/content/step-1-description.txt';
import consentFormHTML from 'raw-loader!../../static/content/consent-form.txt';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';

@inject(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass)

export class Step_1 {
	
	constructor(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass) {
		this.router = Router;
		this.consent_checked = false;
		this.loading = true;

		this.mongoStitchApiService = MongoStitchApiService;
		this.luzzuApiService = LuzzuApiService;
		this.dataStore = DataStore;
		this.singlePass = SinglePass;

		this.stepDescription = stepDescription;
		this.consentFormHTML = consentFormHTML;

	}

	activate() {

		if( !this.singlePass.checkLastEntry('init') ) {
			location.reload();
		}

		this.singlePass.add('step_1');
	}

	attached() {
		window.scrollTo(0,0);
		this.loading = false;
	}

	next() {
		this.loading = true;

		console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 1 -> step 2)' );
    console.log( '---------- ---------- \n\n\n' );

		this.router.navigate('step_2');
	}
}