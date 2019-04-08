import {inject} from 'aurelia-framework';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import * as FileSaver from 'file-saver';

@inject(MongoStitchApiService)

export class DbDump {
  constructor(MongoStitchApiService) {
    this.mongoStitchApiService = MongoStitchApiService;
    this.loading = true;
    this.results = [];
  }

  activate() {

    let p1 = new Promise( (resolve, reject) => {
      this.mongoStitchApiService.getEverything()
      .then( (results) => {
        this.results = results;
        resolve();
      });
    });
    
    return p1;
  }

  attached() {
    this.loading = false;
  }

  createDumpFile() {
    this.loading = true;

    let blob = new Blob( [JSON.stringify(this.results, null, '\t')] , {
      type: "application/json;charset=utf-8;",
    });
      
    FileSaver.saveAs(blob, 'luzzu_evaluation_db_dump_' + Date.now().toString() + '.json');

    this.loading = false;
    console.log(this.results);
  }

}


