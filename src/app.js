import {PLATFORM} from 'aurelia-pal';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'app.css';

export class App {
  
  constructor() {
    this.message = 'Hello World!';
  }

  configureRouter(config, router) {
		this.router = router;
		
	  config.title = 'Evaluation';

	  config.map([
			{ route: ['', 'step_1'],       name: 'step_1',       moduleId: PLATFORM.moduleName( './routes/step_1'), nav: true },
			{ route: 'step_2',             name: 'step_2',       moduleId: PLATFORM.moduleName( './routes/step_2'), nav: true }
	  ]);

	  
	}
}
