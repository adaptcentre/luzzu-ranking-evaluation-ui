import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import SinglePass from '../services/single-pass.js';
import RankingConverter from '../services/ranking-converter.js';


import stepDescription from 'raw-loader!../content/step-2-description.txt';


@inject(Router, DataStore, LuzzuApiService, SinglePass, RankingConverter)

export class Step_1 {
	
	constructor(Router, DataStore, LuzzuApiService, SinglePass, RankingConverter) {
		this.router = Router;
		this.loading = true;

		this.luzzuApiService = LuzzuApiService;
		this.dataStore = DataStore;
    this.singlePass = SinglePass;
    this.rankingConverter = RankingConverter;

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
          let converted = this.rankingConverter.convertIncomming( rankingData );
          this.dataStore.setRanking( converted );
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
        value: 0,
        apiValue: 0
      };

      let isInRanking = this.ranking.find( (ranking) => {
        return ranking.name === dimension.name;
      });

      if( isInRanking ) {
        dim.suggested = true;
        dim.value = isInRanking.value;
        dim.apiValue = isInRanking.apiValue;
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
    console.table( this.dataStore.clone(selected) );
    console.log( '---------- ---------- \n\n\n' );

    let result = this.dataStore.clone( this.output ).map( (el) => {
      //name, desc, suggested, selected, value
      return { name: el.name, value: el.value, apiValue: el.apiValue, selected: el.selected };
    });

    this.dataStore.addDataToUserData('step_2', result);

    //need to send this.output to DB

		this.router.navigate('step_3');
	}
}