import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

export default class MongoStitchApiService {

  constructor() {
    this.client = Stitch.initializeDefaultAppClient('luzzu-evaluation-stitch-mtcpu');
  }

  sendDataToDb( userData ) {
    let p = new Promise( (resolve, reject) => {

     

      this.client.auth.loginWithCredential( new AnonymousCredential() )
      .then( (user) => {
        console.log(`Logged in as anonymous user with id ${user.id}`);
        
        userData.user_id = user.id;

        let db = this.client.getServiceClient( RemoteMongoClient.factory, 'mongodb-atlas-luzzu-evaluation').db('Evaluation');
        
        return db.collection('user-data').insertOne(userData);
      })
      .then( (result) => {
        console.log('Insert Successfull', result.insertedId.toString());
        resolve();
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
    });

    return p;
  }

  getEverything() {
    
    
    
    let p = new Promise( (resolve, reject) => {

      this.client.auth.loginWithCredential( new AnonymousCredential() )
      .then( (user) => {
        console.log(`Logged in as anonymous user with id ${user.id}`);
        
        let db = this.client.getServiceClient( RemoteMongoClient.factory, 'mongodb-atlas-luzzu-evaluation').db('Evaluation');
        
        return db.collection('user-data').find();
      })
      .then( (results) => {
        
        let items = results.toArray();


        resolve(items);
      })
      .catch(err => {
        console.error(err);
        reject(err);
      });
    });

    return p;
  }
}