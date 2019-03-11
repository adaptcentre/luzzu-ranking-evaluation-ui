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

  remove() {
    //https://stackoverflow.com/questions/39055388/in-aurelia-can-i-bind-a-function-from-my-containing-view-model-to-be-called-by/39056533
    
    let event = new CustomEvent('remove-metric', { 
      detail: this.metric.id,
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }
}

