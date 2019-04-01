import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import RankingConverter from './ranking-converter.js';

// might need to install polyfill for fetch
// https://github.com/github/fetch
// https://aurelia.io/docs/plugins/http-services#aurelia-fetch-client

@inject(HttpClient, RankingConverter)

export default class LuzzuApiService {
  
  constructor(HttpClient, RankingConverter) {
    this.httpClient = HttpClient;
    this.converter = RankingConverter;

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

      this.converter.convertIncomming( output ); //might need to move this

      return output;
    })
    .catch( (err) => {
      console.log( err );
      return [];
    });
  }

  getDimensions() {

    let mockDimensions = [
      { name: 'Interoperability', desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio' },
      { name: 'Licensing',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Trustworthiness',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 222',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 333',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 444',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 555',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 666',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 777',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 888',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 999',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 100',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 200',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  },
      { name: 'Lorem 300',  desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum optio consectetur itaque exercitationem nisi commodi, molestias deleniti expedita doloremque ea tempore modi quidem magnam. Necessitatibus impedit veritatis ipsa architecto distinctio'  }
    ];

    console.log('Getting dimensions from API (mock)');

    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {

        resolve( mockDimensions );
      }, getRandomArbitrary( 500, 2000) );
    });
  }

  getResults( requestObj ) {
    //http://irc-eval.adaptcentre.ie/framework-apis/v4/irc-evaluation/rank/weighted/
    let endpoint = 'framework-apis/v4/irc-evaluation/rank/weighted/';
    
    if(!requestObj) {
      requestObj = [
        {
            "type":"dimension",
            "uri":"http://purl.org/eis/vocab/dqm#Interoperability",
            "weight": "0.2692"
        },
        {
            "type":"dimension",
            "uri":"http://purl.org/eis/vocab/dqm#Licensing",
            "weight": "0.2471"
        },
        {
            "type": "dimension",
            "uri": "http://github.io/jerdeb/lsqm#TrustworthinessDimension",
            "weight": "0.4837"
        }
      ];
    }
    
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