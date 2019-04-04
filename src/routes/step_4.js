import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';
import RankingConverter from '../services/ranking-converter.js';

import stepDescription from 'raw-loader!../../static/content/step-4-description.txt';

@inject(Router, LuzzuApiService, MongoStitchApiService, DataStore, SinglePass, RankingConverter)

export default class Step_4 {
  constructor(Router, LuzzuApiService, MongoStitchApiService, DataStore, SinglePass, RankingConverter) {
    
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.mongoStitchApiService = MongoStitchApiService;
    this.dataStore = DataStore;
    this.singlePass = SinglePass;
    this.rankingConverter = RankingConverter;
    
    this.loading = true;

    this.results = [];

    this.stepDescription = stepDescription;
  }

  activate() {

    // if we did not come from step 1 then naviagte back to step 1 to force reload
    if( !this.singlePass.checkLastEntry('step_3') ) {
      this.mainRouter.navigate('step_1');
      return;
    }
    
    this.singlePass.add('step_4');

    this.userSelectedDimensions = this.dataStore.getUserSelectedDimensions();
    this.userSelectedDimensions = this.rankingConverter.convertOutgoing( this.userSelectedDimensions );

    let requestObj = this.dataStore.createResultRequestObject( this.userSelectedDimensions );
    
    // get results
    let p1 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getResults( requestObj )
      .then( (resultData) => {
        this.results = resultData.map( (el) => {
          el.selected = false;
          return el;
        });
        resolve();
      });
    });
		
		return p1;
  }

  attached() {
    window.scrollTo(0,0);
    this.loading = false;
    this.results = this.results.slice(0, 6);
  }

  next() {
    this.loading = true;
    
    //save selected datasets in DB
    let output = JSON.parse( JSON.stringify( this.results ) );

    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 3 -> step 4)' );
    console.table( JSON.parse( JSON.stringify( output ) ) );
    console.log( '---------- ---------- \n\n\n' );
    
    this.mainRouter.navigate('step_5');
  }
}