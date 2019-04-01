import {bindable, inject} from 'aurelia-framework';
import DataStore from '../../services/data-store.js';

//http://ionden.com/a/plugins/ion.rangeSlider/api.html

import 'ion-rangeslider/css/ion.rangeslider.min.css';
import 'ion-rangeslider';

/*

Result strucute:

Dataset-PLD: "http://id.loc.gov/vocabulary/graphicMaterials/"
Description: "The Thesaurus for Graphic Materials (TGM) is a tool for indexing visual (graphic) materials by subject and genre/format. In 2007 TGM I and TGM II were merged. TGM provides a controlled vocabulary for describing a broad range of subjects including activities, objects, types of people, events, and places (but not proper noun names of people, organizations, events, and geographic places). Its scope also includes genre in terms of both physical form (Lantern slides) and content (e.g., Landscape photographs). It supplements Library of Congress Subject Headings, as greater granularity for image description is often needed beyond what LCSH provides."
Graph-URI: "https://w3id.org/lodquator/resource/174089dd-a53b-4792-bbc4-435afc147197"
Rank-Value: 0.51748321
Title: "Thesaurus of Graphic Materials (Library of Congress)"
Website: "http://id.loc.gov/vocabulary/graphicMaterials/"

*/

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

