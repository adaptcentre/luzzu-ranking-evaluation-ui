

export default class SinglePass {

  constructor() {
    this.history = [];
    this.history.push('init');

    this.enabled = true;
  }

  add(place) {
    this.history.push( place );
  }

  checkLastEntry( query ) {

    if(!this.enabled) {
      return true;
    }

    let clone = JSON.parse( JSON.stringify ( this.history ) );
    let last = clone.pop();

    if(last === query) {
      return true;
    }
    
    return false;
  }


}