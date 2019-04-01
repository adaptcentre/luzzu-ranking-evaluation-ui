import {bindable, inject} from 'aurelia-framework';


@inject(Element)

export class Question {
  @bindable question;
  
  constructor(Element) {
    this.element = Element;

    this.selected = {
      yes: false,
      no: false
    };
  } 

  clickedAnswer(element, answer) {
    
    this.question.answer = answer;

    this.resetSelected();
    this.selected[answer] = true;
    this.question.disabled = false;
  }

  resetSelected() {
    this.selected.yes = false;
    this.selected.no = false;
  }

  valueChanged(newValue, oldValue) {
    console.log(newValue);
  }

  attached() {
    //onFinish
    console.log('question component attached')
    // 1. Initialise range slider instance
  }
}

