import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

import evaluationDesc from 'raw-loader!../../static/evaluation-desc.txt';
import consentFormHTML from 'raw-loader!../../static/consentform.txt';

@inject(Router)

export class Step_1 {
	
	constructor(Router) {
		this.router = Router;
		this.consent_checked = false;
		this.loading = true;

		this.consentFormHTML = consentFormHTML;
		this.evaluationDesc = evaluationDesc;
	}

	attached() {
		this.loading = false;
	}

	next() {
		this.loading = true;
		//this.router.navigateToRoute('ranking');
		this.router.navigate('step_2/ranking')
	}
}