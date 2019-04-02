import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

// might need to install polyfill for fetch
// https://github.com/github/fetch
// https://aurelia.io/docs/plugins/http-services#aurelia-fetch-client

@inject(HttpClient)

export default class MongoStitchApiService {
  constructor(HttpClient) {
    this.httpClient = HttpClient;
    this.client = Stitch.initializeDefaultAppClient('luzzu-evaluation-stitch-mtcpu');
  }

  initSession() {
    
    let p = new Promise( (resolve, reject) => {

      this.client.auth.loginWithCredential( new AnonymousCredential() )
      .then( (user) => {
        console.log(`Logged in as anonymous user with id ${user.id}`);
        //this.db = this.client.getServiceClient( RemoteMongoClient.factory, 'mongodb-atlas-luzzu-evaluation').db('Evaluation');
        //return this.db.collection('user-data').insertOne();
        return user.id;
      })
      .then( (id) => {
        //let id = result.insertedId.toString();
        resolve(id);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
    });
    return p;
  }

  sendResults(userData) {
    console.log('sending stuff to DB', userData);

    return new Promise( (resolve, reject) => {
      this.db = this.client.getServiceClient( RemoteMongoClient.factory, 'mongodb-atlas-luzzu-evaluation').db('Evaluation');
      
      this.db.collection('user-data')
      .insertOne(userData)
      .then( (result) => {
        console.log('Insert Successfull', result.insertedId.toString());
        resolve();
      })
      .catch( (err) => {
        reject(err);
      });

      /*
      return this.db.collection('user-data').updateOne(
        {_id: userData.id},  //query
        { $set:{ userData: userData } }, //update
        {upsert: true} //options
      )
      .then( (result) => {
        console.log(result);
        resolve();
      })
      .catch( (err) => {
        reject(err);
      })
      */
    });
  }
}