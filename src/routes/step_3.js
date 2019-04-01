import { inject } from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';
import {Router} from 'aurelia-router';
import DataStore from '../services/data-store.js';
import LuzzuApiService from '../services/luzzu-api-service.js';

@inject(Router, LuzzuApiService, DataStore)

export class Step_3 {
	
	constructor(Router, LuzzuApiService, DataStore) {
    this.mainRouter = Router;
    this.luzzuApiService = LuzzuApiService;
    this.dataStore = DataStore;
    
    this.loading = true;

    this.ranking = []; // should get populated in activate hook
    this.dimensions = [];
    this.results = [];

    this.question = {
      header: 'Question header',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit?',
      answer: null,
      disabled: true
    }
  }

  configureRouter(config, router, params) {
  		
		config.map([
			{ route: ['','ranking'],   name: 'ranking',  moduleId: PLATFORM.moduleName( 'routes/step_3-ranking') },
			{ route: 'results',   name: 'results',  moduleId: PLATFORM.moduleName( 'routes/step_3-results') }
    ]);
    
    this.childRouter = router;
	}
  
  
  activate() {
    /* 
      Here we need to make some api calls to get the ranking data
      and to get al list of all possible dimensions a user can add
    */

    let p1 = new Promise( (resolve, reject) => {

      this.luzzuApiService.getRankingData()
        .then( (rankingData) => {
      
          this.dataStore.setRanking( rankingData );
          resolve();
        });
    });

    let p2 = new Promise( (resolve, reject) => {
      this.luzzuApiService.getDimensions()
      .then( (dimensionsData) => {
        this.dataStore.setDimensions( dimensionsData );
        resolve();
      });
    });

    return Promise.all([p1, p2]);
  }

	attached() {
    this.reset();
    this.loading = false;
    console.log('step 3 attached');
  }
  
  openModal() {
    $('#addDimensionModal').modal({});
  }

  debug() {
    this.luzzuApiService.sendRankingData( this.ranking )
  }

  changedSubView() {
    console.log('changed subview');
  }

  //------

  removeDimensionFromRanking(event) {

    let id = event.detail;

    let index = this.ranking.findIndex( (el) => {
      return el.id === id;
    });
  
    this.ranking.splice(index, 1);
  }

  addDimensionsToRanking(event) {
    let dimensionsToAdd = event.detail;
    
    for(let dimId of dimensionsToAdd) {
      let dimension = {
        name: dimId.name,
        id: dimId.id,
        value: 0
      }

      this.ranking.push(dimension);
    }

    this.dimensions = this.filterDimensions( this.dataStore.getDimensions() );
  }

  reset() {
    this.ranking = this.dataStore.getRanking();
    this.dimensions = this.filterDimensions( this.dataStore.getDimensions() );
  }

  // need this so we cannot add the same ones twice
  filterDimensions( dimensions ) {

    return dimensions.filter( (el) => {
      
      let found = this.ranking.findIndex( (elm) => {
        return el.name === elm.name;
      });

      if(found === -1) {
        return true;
      }
      
      return false;
    });
  }

  //------

	next() {
    this.loading = true;
    
    this.luzzuApiService.sendRankingData( this.ranking )
      .then( (results) => {
        this.dataStore.setResults( results );
        this.mainRouter.navigateToRoute('step_4', { from: 'step_3' } );
      });
	}
}