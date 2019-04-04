import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';

import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import SinglePass from '../services/single-pass.js';
import RankingConverter from '../services/ranking-converter.js';

import stepDescription from 'raw-loader!../content/step-6-description.txt';

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
    if( !this.singlePass.checkLastEntry('step_5') ) {
      this.mainRouter.navigate('step_1');
      return;
    }
    
    this.singlePass.add('step_6');

    let ranking = this.dataStore.getRanking();
    ranking = this.rankingConverter.convertOutgoing( ranking );

    let requestObj = this.dataStore.createResultRequestObject( ranking );
    
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
    console.log( 'Proceeding to next step (step 6 -> step 7)' );
    console.table( JSON.parse( JSON.stringify( output ) ) );
    console.log( '---------- ---------- \n\n\n' );

    this.dataStore.addDataToUserData('step_6', output );

    let userData = this.dataStore.getUserData();
    
    //sending this to DB
    console.log('THIS IS THE USER DATA THAT WILL BE SEND TO THE DB');
    console.log(userData);

    this.mongoStitchApiService.sendDataToDb( userData )
    .then( () => {
      console.log('data send successfully to db')
      this.mainRouter.navigate('step_7');
    })
    
    
  }
}