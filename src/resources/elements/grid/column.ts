import {bindable, noView} from 'aurelia-framework';

@noView
export class Column {
  @bindable title;
  @bindable dataField;
  @bindable align;
  @bindable width;
  @bindable dataType;
}