import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
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
        .withBaseUrl('http://luzzu.adaptcentre.ie/framework-apis/v4/')
    });
  }

  getRankingData() {
    let mockData = [
      { id: 0, name: 'Interoperability', value: 0, apiValue: '28.85' },
      { id: 1, name: 'Licensing',        value: 0, apiValue: '26.42' },
      { id: 2, name: 'Trustworthiness',  value: 0, apiValue: '44.74' }
    ]

    console.log('Getting ranking data from API');

    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {

        this.converter.convertIncomming( mockData );

        console.table( JSON.parse( JSON.stringify(mockData) ) );

        resolve( mockData );
      }, getRandomArbitrary( 500, 2000) );
    });
  }

  sendRankingData( data ) {

    let results = [
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' },
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' },
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' },
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' },
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' },
      { desc: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae sint earum possimus commodi aut quaerat fuga, nostrum asperiores iste quia atque quod officiis, incidunt repellat culpa libero aperiam neque sequi' }
    ];


    let mockData = data.map( (el) => {
      return { id: el.id, name: el.name, value: el.value }
    })

    this.converter.convertOutgoing( mockData );
    
    console.log('Sending ranking data to API');
    console.table( JSON.parse( JSON.stringify(mockData) ) );

    return new Promise( (resolve, reject) => {
      
      setTimeout( () => {
        resolve( results );
      }, getRandomArbitrary( 500, 2000) );
    })

    
  }



}


// ---
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}