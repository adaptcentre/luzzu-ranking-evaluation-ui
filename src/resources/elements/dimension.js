import {bindable, inject} from 'aurelia-framework';
import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element)

export class Dimension {
  @bindable dimension;
  @bindable readonly;
  
  constructor(Element, DataStore, EventAggregator) {
    this.element = Element;
  } 

  attached() {
    let el = $(this.element).find(".js-range-slider");

    el.ionRangeSlider({
      from: this.dimension.value,
      min: 0,
      max: 100,
      grid: true ,
      hide_min_max: true,
      disable: this.readonly,
      onFinish: (data) => {
        this.dimension.value = data.from;
        this.change();
      }
    });

  }
}

