import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import SinglePass from '../services/single-pass.js';


import stepDescription from 'raw-loader!../content/step-3-description.txt';


@inject(Router, DataStore, LuzzuApiService, SinglePass)

export class Step_3 {
	
	constructor(Router, DataStore, LuzzuApiService, SinglePass) {
		this.router = Router;
    this.loading = true;
    
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
    
    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 3 -> step 4)' );
    console.table( this.dataStore.clone( this.userSelectedDimensions ) );
    console.log( '---------- ---------- \n\n\n' );

    let result = this.dataStore.clone( this.userSelectedDimensions ).map( (el) => {
      //name, desc, suggested, selected, value
      return { name: el.name, value: el.value, selected: el.selected };
    });

    this.dataStore.addDataToUserData('step_3', result );

		this.router.navigate('step_4');
	}
}