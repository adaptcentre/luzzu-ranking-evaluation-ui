import {inject} from 'aurelia-framework';
import MongoStitchApiService from '../services/mongo-stitch-api-service.js';
import * as FileSaver from 'file-saver';

@inject(MongoStitchApiService)

export class DbDump {
  constructor(MongoStitchApiService) {
    this.mongoStitchApiService = MongoStitchApiService;
    this.loading = true;
  }

  attached() {
    this.loading = false;
  }

  createDumpFile() {
    this.loading = true;

    console.log('getting data from server');

    this.mongoStitchApiService.getEverything()
    .then( (results) => {

      let blob = new Blob( [JSON.stringify(results, null, '\t')] , {
          type: "application/json;charset=utf-8;",
      });
      
      FileSaver.saveAs(blob, 'luzzu_evaluation_db_dump_' + Date.now().toString() + '.json');

      this.loading = false;
      console.log(results);
    });

  }

}


