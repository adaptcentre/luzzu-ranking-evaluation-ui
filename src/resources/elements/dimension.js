import {bindable, inject, containerless} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element, DataStore)

export class Dimension {
  @bindable dimension;
  @bindable readonly;
  
  constructor(Element, DataStore) {
    this.element = Element;
    this.dataStore = DataStore;
  } 

  valueChanged(newValue, oldValue) {
    console.log(newValue);
  }

  attached() {
    //onFinish
    console.log('dimensions component attached')
    // 1. Initialise range slider instance
    let el = $(this.element).find(".js-range-slider");

    el.ionRangeSlider({
      disable: this.readonly,
      onFinish: (data) => {
        console.log( `Dimension: ${this.dimension.name} value changed from ${this.dimension.value} to ${data.from}` );
        this.dimension.value = data.from;
        this.change();
      }
    });

  }

  getDesc() {
    let desc = this.dataStore.getDimensionsDesc( this.dimension.name );
    
    return desc;
  }

  remove() {
    //https://stackoverflow.com/questions/39055388/in-aurelia-can-i-bind-a-function-from-my-containing-view-model-to-be-called-by/39056533
    
    let event = new CustomEvent('remove-dimension', { 
      detail: this.dimension.name,
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }

  change() {
    let event = new CustomEvent('change-dimension', {
      detail: JSON.parse( JSON.stringify( this.dimension ) ),
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }
}

