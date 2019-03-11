import {bindable, inject} from 'aurelia-framework';

@inject(Element)

export class Metric {
  @bindable metric;
  
  constructor(Element) {
    this.element = Element;
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
}

