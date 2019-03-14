import {bindable, inject} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element, DataStore)

export class Metric {
  @bindable metric;
  
  constructor(Element, DataStore) {
    this.element = Element;
    this.dataStore = DataStore;
  } 

  valueChanged(newValue, oldValue) {
    console.log(newValue)
  }

  attached() {
    //onFinish

    // 1. Initialise range slider instance
    let el = $(this.element).find(".js-range-slider");

    el.ionRangeSlider({
      onFinish: (data) => {
        console.log(data.from)
      }
    });

  }

  remove() {
    //https://stackoverflow.com/questions/39055388/in-aurelia-can-i-bind-a-function-from-my-containing-view-model-to-be-called-by/39056533
    
    let event = new CustomEvent('remove-metric', { 
      detail: this.metric.id,
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }
}

