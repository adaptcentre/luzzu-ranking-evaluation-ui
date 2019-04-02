import {PLATFORM} from 'aurelia-pal';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all'
import 'app.css';

export class App {
  
  configureRouter(config, router) {
		this.router = router;
		
	  config.title = 'Evaluation';

	  config.map([
			{ route: ['', 'step_1'],   name: 'step_1',    moduleId: PLATFORM.moduleName( 'routes/step_1'),   nav: true },
			{ route: 'step_2a',        name: 'step_2a',    moduleId: PLATFORM.moduleName( 'routes/step_2a'),   nav: true },
			{ route: 'step_2b',        name: 'step_2b',    moduleId: PLATFORM.moduleName( 'routes/step_2b'),   nav: true },
			{ route: 'step_3',         name: 'step_3',    moduleId: PLATFORM.moduleName( 'routes/step_3'),   nav: true },
			{ route: 'step_4',         name: 'step_4',    moduleId: PLATFORM.moduleName( 'routes/step_4'),   nav: true }
	  ]);
	}
}
