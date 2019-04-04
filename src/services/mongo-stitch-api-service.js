import { Stitch, RemoteMongoClient, AnonymousCredential } from 'mongodb-stitch-browser-sdk';

export default class MongoStitchApiService {

  sendDataToDb( userData ) {
    let p = new Promise( (resolve, reject) => {

      let client = Stitch.initializeDefaultAppClient('luzzu-evaluation-stitch-mtcpu');

      client.auth.loginWithCredential( new AnonymousCredential() )
      .then( (user) => {
        console.log(`Logged in as anonymous user with id ${user.id}`);
        
        userData.user_id = user.id;

        let db = client.getServiceClient( RemoteMongoClient.factory, 'mongodb-atlas-luzzu-evaluation').db('Evaluation');
        
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
}