import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';


import stepDescription from 'raw-loader!../../static/content/step-2-description.txt';


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
    
    this.ranking = [];
    this.dimensions = [];
    this.output = [];
  }
  
  activate() {

    // single pass logic
    if( !this.singlePass.checkLastEntry('step_1') ) {
      this.router.navigate('step_1');
      return
		}

    this.singlePass.add('step_2');
    
    // ------------------------------------------------

    // get dimension data - need this for descriptios
		let p1 = new Promise( (resolve, reject) => {
			this.luzzuApiService.getDimensions()
			.then( (dimensionData) => {
				this.dataStore.setDimensions( dimensionData );
				resolve();
			});
    });
    
    // get ranking
    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getRanking()
        .then( (rankingData) => {
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    return Promise.all( [p1, p2] );
  }

	attached() {
    window.scrollTo(0,0);
    this.loading = false;
    
    this.ranking = this.dataStore.getRanking();
    this.dimensions = this.dataStore.getDimensions();

    //now we have to create our output array that will be used in the view

    this.output = this.dimensions.map( (dimension) => {

      let dim = { 
        name: dimension.name, 
        desc: dimension.desc, 
        suggested: false,
        selected: false,
        value: 0
      };

      let isInRanking = this.ranking.find( (ranking) => {
        return ranking.name === dimension.name;
      });

      if( isInRanking ) {
        dim.suggested = true;
        dim.value = isInRanking.value;
      }

      return dim;
    }).sort( (a,b) => {
      return b.suggested - a.suggested;
    });
  }
  
  selectDimension(index) {
    this.output[index].selected = !this.output[index].selected;
  }

	next() {
    this.loading = true;

    let selected = this.output.filter( (el) => { 
      return el.selected === true;
    });

    this.dataStore.setUserSelectedDimensions( selected );

    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 2 -> step 3)' );
    console.table( JSON.parse( JSON.stringify(selected) ) );
    console.log( '---------- ---------- \n\n\n' );

    //need to send this.output to DB

		this.router.navigate('step_3');
	}
}