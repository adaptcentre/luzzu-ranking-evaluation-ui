import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';

import taskDesc from 'raw-loader!../../static/content/task-1-desc.txt';
import questions from 'raw-loader!../../static/content/questions.txt';
import { isNull } from 'util';

@inject(Router, LuzzuApiService, MongoStitchApiService, DataStore)

export class Step_2b {
	
	constructor(Router, LuzzuApiService, MongoStitchApiService, DataStore) {
    
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.mongoStitchApiService = MongoStitchApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = [];
    this.results = [];

    this.taskDesc = taskDesc;

    let tempQ = JSON.parse(questions);

    this.question = {
      header: tempQ['two'].header,
      text: tempQ['two'].text,
      answer: null,
      disabled: true
    }

    this.time = {
      start: null,
      end: null
    }
  }

  
  activate() {

    let requestObj = this.dataStore.createResultRequestObject( this.dataStore.getRanking() );
    
    // get result data
    let p1 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getResults(requestObj)
      .then( (resultData) => {
        this.dataStore.setResults( resultData );
        resolve();
      });
    });

    return p1;
  }

	attached() {
    this.loading = false;

    this.results = this.dataStore.getResults();

    this.time.start = Date.now();
  }
  
	next() {
    this.loading = true;

    this.time.end = Date.now();
    
    this.dataStore.addQuestion('step2b', JSON.parse( JSON.stringify(this.question) ) );
    this.dataStore.updateStep('step2b', this.time);

    this.mainRouter.navigate('step_3/ranking');
  }
}