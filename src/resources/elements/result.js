import {bindable, inject} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

@inject(Element, DataStore)

export class Result {
  @bindable result;
  
  constructor(Element, DataStore) {
    this.element = Element;
    this.dataStore = DataStore;
  } 

  valueChanged(newValue, oldValue) {
    console.log(newValue);
  }

  attached() {
    //onFinish
    console.log('result component attached');
  }
}

