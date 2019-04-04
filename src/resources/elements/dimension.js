import {bindable, inject, containerless} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';
import {EventAggregator} from 'aurelia-event-aggregator';
//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element, DataStore, EventAggregator)

export class Dimension {
  @bindable dimension;
  @bindable readonly;
  
  constructor(Element, DataStore, EventAggregator) {
    this.element = Element;
    this.dataStore = DataStore;
    this.eventAggregator = EventAggregator;
    this.subscriptions = [];
  } 

  attached() {
    let el = $(this.element).find(".js-range-slider");

    el.ionRangeSlider({
      from: this.dimension.value * 100,
      min: 0,
      max: 100,
      grid: true ,
      hide_min_max: true,
      disable: this.readonly,
      onFinish: (data) => {
        this.dimension.value = data.from / 100;
        this.change();
      }
    });

    let s1 = this.eventAggregator.subscribe('dimension-update-value', () => {
      
      //name="my_range_${dimension.name}"
      let range = $('input[name="my_range_' + this.dimension.name + '"]').data("ionRangeSlider");
      
      range.update({
        from: this.dimension.value * 100,
      })
    });

    this.subscriptions.push(s1);
  }

  detached() {
    for(let sub of this.subscriptions) {
      sub.dispose();
    }
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

