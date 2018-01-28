import { bindable, children, inject} from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Action } from './action';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Router, EventAggregator)
export class ActionBar {
  @children('action') actions: Action[];
  @bindable parent;
  @bindable buttons;
  @bindable rightButtons;
  @bindable searchGrid: boolean = false;
  @bindable hasScroll: boolean = false;

  searchVisible: boolean = false;
  searchIcon: string = 'search';

  constructor(private router: Router, private events: EventAggregator) {}

  bind(bindingContext) {
    this.parent = bindingContext;
  }

  executeAction(action: string, href?: string) {
    if (action) {
      if (action === 'routeTo' && href) {
        console.log(`Routing to ${href}`);
        this.router.navigate(href);
      } else {
        try {
          this.parent[action](this['search']);
        } catch (error) {
          if (error.message === 'this.parent[action] is not a function') {
            console.error(`${action} does not exist.`);
          } else {
            console.error(`${error.message}`);
          }
        }
      }
    }
  }

  executeSearch() {
    this.events.publish('grid.filter', this['search']);
    this.searchVisible = false;
  }

  showSearch(visible: boolean) {
    this.searchVisible = visible;
  }
}