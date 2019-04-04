import {bindable, inject} from 'aurelia-framework';

@inject(Element)

export class Result {
  @bindable result;
  
  constructor(Element) {
    this.element = Element;
  } 

  selectResult() {
    this.result.selected = !this.result.selected;
  }
}

