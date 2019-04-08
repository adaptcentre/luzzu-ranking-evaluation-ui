import {PLATFORM} from 'aurelia-pal';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all'
import 'app.css';

export class App {

	constructor() {
		//turn off console logging - not sure if a good idea
		//console.log = function() {}
	}
  
  configureRouter(config, router) {
		this.router = router;
		
	  config.title = 'Evaluation';

	  config.map([
			{ route: '',         redirect: 'step_1' },
			{ route: 'step_1',   name: 'step_1',    moduleId: PLATFORM.moduleName( 'routes/step_1'),   nav: true },
			{ route: 'step_2',   name: 'step_2',    moduleId: PLATFORM.moduleName( 'routes/step_2'),   nav: true },
			{ route: 'step_3',   name: 'step_3',    moduleId: PLATFORM.moduleName( 'routes/step_3'),   nav: true },
			{ route: 'step_4',   name: 'step_4',    moduleId: PLATFORM.moduleName( 'routes/step_4'),   nav: true },
			{ route: 'step_5',   name: 'step_5',    moduleId: PLATFORM.moduleName( 'routes/step_5'),   nav: true },
			{ route: 'step_6',   name: 'step_6',    moduleId: PLATFORM.moduleName( 'routes/step_6'),   nav: true },
			{ route: 'step_7',   name: 'step_7',    moduleId: PLATFORM.moduleName( 'routes/step_7'),   nav: true },
			{ route: 'db_dump',   name: 'db_dump',    moduleId: PLATFORM.moduleName( 'routes/db_dump') }
	  ]);
	}
}
