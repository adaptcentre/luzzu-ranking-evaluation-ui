import {bindable, inject} from 'aurelia-framework';

@inject(Element)

export class Pagination {
  @bindable currentPageIndex;
  @bindable length;

  constructor(Element) {
    this.element = Element;
  }

  paginationNext() {
    console.log('pagination next');
    
    let newIndex = this.currentPageIndex + 1;
    
    if(newIndex < this.length) {
      this.currentPageIndex = newIndex;
      
      let event = new CustomEvent('pagination-next', {
        bubbles: true
      });
  
      this.element.dispatchEvent(event);
    }    
  }

  paginationPrevious() {
    console.log('pagination previous');

    let newIndex = this.currentPageIndex - 1;
    
    if(newIndex > -1) {
      this.currentPageIndex = newIndex;
      
      let event = new CustomEvent('pagination-previous', {
        bubbles: true
      });
  
      this.element.dispatchEvent(event);
    }
  }

  paginationChange(index) {
    console.log('pagination change to', index);

    this.currentPageIndex = index;

    let event = new CustomEvent('pagination-next', {
      detail: index,
      bubbles: true
    });

    this.element.dispatchEvent(event);
  }
}

