import {bindable, inject} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

@inject(Element, DataStore)

export class AddMetric {
  @bindable metrics;
  
  constructor(Element, DataStore) {
    this.element = Element;
    this.dataStore = DataStore;
  } 

  valueChanged(newValue, oldValue) {
    console.log(newValue)
  }

  attached() {
    console.log(this.metrics)
  }

  selectMetric(metric) {
    if(!metric.selected) {
      metric.selected = true;
    } else {
      metric.selected = false;
    }
  }

  // -----

  addMetricsToRanking() {
    //https://stackoverflow.com/questions/39055388/in-aurelia-can-i-bind-a-function-from-my-containing-view-model-to-be-called-by/39056533

    let selected = this.metrics.filter( (metric) => {
      return metric.selected === true;
    })

    let event = new CustomEvent('add-metrics-to-ranking', { 
      detail: selected,
      bubbles: true
    });

    this.element.dispatchEvent(event);

    $('#addDimensionModal').modal('toggle');
  }
}

