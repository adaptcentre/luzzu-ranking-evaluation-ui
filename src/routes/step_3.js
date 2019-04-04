import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';


import stepDescription from 'raw-loader!../../static/content/step-3-description.txt';


@inject(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass)

export class Step_3 {
	
	constructor(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass) {
		this.router = Router;
		this.consent_checked = false;
		this.loading = true;

		this.mongoStitchApiService = MongoStitchApiService;
		this.luzzuApiService = LuzzuApiService;
		this.dataStore = DataStore;
		this.singlePass = SinglePass;

    this.stepDescription = stepDescription;
    
    this.userSelectedDimensions = [];
  }
  
  activate() {
    if( !this.singlePass.checkLastEntry('step_2') ) {
      this.router.navigate('step_1');
      return;
		}

    this.singlePass.add('step_3');
  }

	attached() {
    window.scrollTo(0,0);
    this.loading = false;

    this.userSelectedDimensions = this.dataStore.getUserSelectedDimensions();
  }


	next() {
    this.loading = true;
    
    this.dataStore.setUserSelectedDimensions( this.userSelectedDimensions );
    console.log( 'Proceeding to next step (step 3 -> step 4)' );
    
    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 3 -> step 4)' );
    console.table( JSON.parse( JSON.stringify( this.userSelectedDimensions ) ) );
    console.log( '---------- ---------- \n\n\n' );

    //need to send this.output to DB

		this.router.navigate('step_4');
	}
}