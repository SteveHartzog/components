import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Steve\'s Components';
    config.options.pushState = true;
    config.map([
      {
        route: ['', 'welcome'], name: 'welcome',
        moduleId: PLATFORM.moduleName('./pages/welcome/index'),
        nav: true, title: 'Welcome'
      },
      {
        route: 'components', name: 'components', title: 'Components', nav: true,
        moduleId: PLATFORM.moduleName('./pages/sample-grid/index'),
        settings: { icon: 'fa-shield' }
      },
      {
        route: 'grid', name: 'grid', title: 'Grid', nav: true,
        moduleId: PLATFORM.moduleName('./pages/sample-grid/index'),
        settings: { parentMenu: 'Components' }
      },
      {
        route: 'actionbar', name: 'actionbar', title: 'ActionBar', nav: true,
        moduleId: PLATFORM.moduleName('./pages/sample-actionbar/index'),
        settings: { parentMenu: 'Components' }
      }
    ]);

    this.router = router;
  }
}
