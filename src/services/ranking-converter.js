import { inject } from 'aurelia-framework';
import * as d3 from 'd3';

//@inject(HttpClient)

export default class RankingConverter {
  
  constructor() {
    /*
      var x = d3.scaleLinear()
        .domain([-1, 1])
        .range([0, 960]);
    */
  }

  convertIncomming( metrics ) {

    let max = d3.max( metrics.map( el => { return el.apiValue; } ) );

    let scale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 100]);

    for ( let metric of metrics ) {
      metric.value = scale(metric.apiValue)
    }
  }

  convertOutgoing( metrics ) {

    let total = metrics.reduce( (total, el) => {
      return total + parseFloat(el.value);
    }, 0);
    
    let scale = d3.scaleLinear()
      .domain([0, total])
      .range([0, 1]);

    for( let metric of metrics ) {
      metric.apiValue = scale( metric.value );
    }
  }

}