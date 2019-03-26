import {bindable, inject, containerless} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element, DataStore)

export class Metric {
  @bindable metric;
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
    console.log('metric component attached')
    // 1. Initialise range slider instance
    let el = $(this.element).find(".js-range-slider");

    el.ionRangeSlider({
      disable: this.readonly,
      onFinish: (data) => {
        console.log( `Metric: ${this.metric.name} value changed from ${this.metric.value} to ${data.from}` );
        this.metric.value = data.from;
      }
    });

  }

  getMetricDesc() {
    console.log(this.metric)

    let desc = this.dataStore.getMetricDesc( this.metric.id );
    
    return desc;
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

