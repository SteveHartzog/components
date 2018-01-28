import {bindable, noView} from 'aurelia-framework';

@noView
export class Action {
  @bindable title;
  @bindable name;
  @bindable href;
  @bindable icon;
}