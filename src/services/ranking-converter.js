import * as d3 from 'd3';

export default class RankingConverter {
  
  convertIncomming( dimensions ) {
    console.log('\n\n\nConverting Incomming');

    dimensions = JSON.parse( JSON.stringify( dimensions ) );

    let max = d3.max( dimensions.map( el => { return el.value; } ) );

    let scale = d3.scaleLinear()
      .domain([0, max])
      .range([0, 100]);

    for ( let dimension of dimensions ) {
      let oldValue = dimension.value
      let newValue = scale(dimension.value)
      
      console.log( dimension.name, 'converted value from', oldValue, 'to', newValue );
      
      dimension.value = newValue;
    }
    console.log('\n\n\n');

    return dimensions;
  }

  convertOutgoing( dimensions ) {
    console.log('\n\n\nConverting Outgoing');

    dimensions = JSON.parse( JSON.stringify( dimensions ) );

    let total = dimensions.reduce( (total, el) => {
      return total + parseFloat(el.value);
    }, 0);
    
    let scale = d3.scaleLinear()
      .domain([0, total])
      .range([0, 1]);

    for( let dimension of dimensions ) {
      let oldValue = dimension.value
      let newValue = scale(dimension.value)

      console.log( dimension.name, 'converted value from', oldValue, 'to', newValue );

      dimension.value = newValue;
    }

    console.log('\n\n\n');

    return dimensions;
  }
}

/*
BACK UP FROM PREVIOUS VERSION
c
*/