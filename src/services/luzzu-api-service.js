import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import RankingConverter from './ranking-converter.js';

// might need to install polyfill for fetch
// https://github.com/github/fetch
// https://aurelia.io/docs/plugins/http-services#aurelia-fetch-client

@inject(HttpClient)

export default class LuzzuApiService {
  
  constructor(HttpClient) {
    this.httpClient = HttpClient;

    this.httpClient.configure( config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://irc-eval.adaptcentre.ie/')
        .withDefaults({
         // credentials: 'same-origin',
          headers: {
              'Accept': 'application/json',
              'X-Requested-With': 'Fetch',
          }
      });
    });
  }

  getRanking() {
    
    // http://irc-eval.adaptcentre.ie/recommender/get_recommendation/
    // {\"Trustworthiness\": 0.4473684210526316, \"Interoperability\": 0.28846153846153844, \"Licensing\": 0.26417004048583}

    console.log('Getting ranking from API');

    let endpoint = 'recommender/get_recommendation';
    
    return this.httpClient.fetch(endpoint, { 
      method: 'get'
    })
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      data = JSON.parse(data); //not sure is needed?
      
      let output = [];

      for(let [key, value] of Object.entries(data) ) {
        output.push( { name: key, apiValue: value, value: 0 } );
      }
      console.log('\n---------------');
      console.log('Got ranking from API');
      console.table(output);
      console.log('---------------\n');
      
      return output;
    })
    .catch( (err) => {
      console.log( err );
      return [];
    });
  }

  updateRanking( requestObj ) {
    //http://irc-eval.adaptcentre.ie/recommender/update_measures
    //POST

    let endpoint = 'recommender/update_measures';

    console.log('Sending Request obj to API to update rankings');
    console.table(requestObj);
        
    return this.httpClient.fetch(endpoint, { 
      method: 'post',
      body: json( requestObj ) 
    })
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      return data;
    })
    .catch( (err) => {
      console.log( err );
    });

  }

  getDimensions() {

    //framework-apis/v4/framework/filtering-facets/ 
    let endpoint = 'framework-apis/v4/framework/filtering-facets/';

    console.log('Getting dimensions from API');
    
    return this.httpClient.fetch(endpoint, { 
      method: 'get'
    })
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      let output = [];

      for( let category of data.Categories ) {
        for( let dimension of category.Dimensions) {

          // requirement to skip this one!
          if( dimension.Label === 'Volume') {
            continue;
          }

          let name = dimension.Label;

          if(name === 'Syntactic Validity') {
            name = 'Syntactic validity';
          }

          output.push({
            name: name,
            desc: dimension.Comment,
            uri: dimension.URI,
            value: 0,
            apiValue: 0
          });
        }
      }
      
      return output;
    })
    .catch( (err) => {
      console.log( err );
      return [];
    });
  }

  getResults( requestObj ) {
    //http://irc-eval.adaptcentre.ie/framework-apis/v4/irc-evaluation/rank/weighted/
    let endpoint = 'framework-apis/v4/irc-evaluation/rank/weighted/';

    console.log('Sending Request obj to API to get results');
    console.table(requestObj);
        
    return this.httpClient.fetch(endpoint, { 
      method: 'post',
      body: json( requestObj ) 
    })
    .then( (response) => {
      return response.json();
    })
    .then( (data) => {
      return data;
    })
    .catch( (err) => {
      console.log( err );
      return [];
    });
  }
}


// ---
// HELPER
// ---
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}