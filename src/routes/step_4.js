import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import SinglePass from '../services/single-pass.js';
import RankingConverter from '../services/ranking-converter.js';

import stepDescription from 'raw-loader!../content/step-4-description.txt';

@inject(Router, LuzzuApiService, DataStore, SinglePass, RankingConverter)

export default class Step_4 {
  constructor(Router, LuzzuApiService, DataStore, SinglePass, RankingConverter) {
    
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
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

    let userSelectedDimensions = this.dataStore.getUserSelectedDimensions();
    userSelectedDimensions = this.rankingConverter.convertOutgoing( userSelectedDimensions );

    let requestObj = this.dataStore.createResultRequestObject( userSelectedDimensions );
    
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
    let output = this.dataStore.clone(  this.results ).map( (el) => {
      //Dataset-PLD, Rank-Value, Graph-URI, Title, Description, Website, selected
      return { 'Rank-Value': el['Rank-Value'], Title: el.Title, Selected: el.selected, 'Dataset-PLD': el['Dataset-PLD'] };
    });

    console.log( '\n\n\n ---------- ----------' );
    console.log( 'Proceeding to next step (step 3 -> step 4)' );
    console.table( output );
    console.log( '---------- ---------- \n\n\n' );

    this.dataStore.addDataToUserData('step_4', output );
    
    this.mainRouter.navigate('step_5');
  }
}