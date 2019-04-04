import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';


import stepDescription from 'raw-loader!../../static/content/step-3-description.txt';


@inject(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass)

export class Step_5 {
	
	constructor(Router, DataStore, LuzzuApiService, MongoStitchApiService, SinglePass) {
		this.router = Router;
		this.loading = true;

		this.mongoStitchApiService = MongoStitchApiService;
		this.luzzuApiService = LuzzuApiService;
		this.dataStore = DataStore;
		this.singlePass = SinglePass;

    this.stepDescription = stepDescription;
    
    this.userSelectedDimensions = [];
  }
  
  activate() {
    if( !this.singlePass.checkLastEntry('step_4') ) {
      this.router.navigate('step_1');
      return;
		}

    this.singlePass.add('step_5');
  }

	attached() {
    window.scrollTo(0,0);
    this.loading = false;

    this.ranking = this.dataStore.getRanking().map( (el) => {
      el.desc = this.getDimensionDescription( el.name );
      return el;
    });
  }

  getDimensionDescription( name ) {
    return this.dataStore.getDimensionDescription( name );
  }

	next() {
    this.loading = true;
    
    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 4 -> step 5)' );
    console.table( JSON.parse( JSON.stringify( this.ranking ) ) );
    console.log( '---------- ---------- \n\n\n' );

    //need to send this.output to DB

		this.router.navigate('step_6');
	}
}