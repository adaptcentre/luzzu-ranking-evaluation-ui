import { inject } from 'aurelia-framework';
import * as d3 from 'd3';

//@inject(HttpClient)

export default class RankingConverter {
  
  convertIncomming( dimensions ) {

    for ( let dimension of dimensions ) {
      dimension.value = dimension.apiValue * 100
    }
  }

  convertOutgoing( dimensions ) {

    for( let dimension of dimensions ) {
      dimension.apiValue = dimension.value / 100;
    }
  }
}

/*
BACK UP FROM PREVIOUS VERSION
convertIncomming( dimensions ) {

    let max = d3.max( dimensions.map( el => { return el.apiValue; } ) );

    let scale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 100]);

    for ( let dimension of dimensions ) {
      dimension.value = scale(dimension.apiValue)
    }
  }

  convertOutgoing( dimensions ) {

    let total = dimensions.reduce( (total, el) => {
      return total + parseFloat(el.value);
    }, 0);
    
    let scale = d3.scaleLinear()
      .domain([0, total])
      .range([0, 1]);

    for( let dimension of dimensions ) {
      dimension.apiValue = scale( dimension.value );
    }
  }
*/