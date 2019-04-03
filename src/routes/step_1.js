import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import evaluationDesc from 'raw-loader!../../static/content/evaluation-desc.txt';
import consentFormHTML from 'raw-loader!../../static/content/consentform.txt';

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

		this.consentFormHTML = consentFormHTML;
		this.evaluationDesc = evaluationDesc;

		this.time = {
			start: null,
			end: null
		}
	}

	activate() {

		if( !this.singlePass.checkLastEntry('init') ) {
			console.log( 'should reload' );
			location.reload();
		}

		this.singlePass.add('step_1');
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

		this.router.navigate('step_2a');
	}
}