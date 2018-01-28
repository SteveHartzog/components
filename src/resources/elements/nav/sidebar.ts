import { bindable, observable } from 'aurelia-framework';

interface Visible {
    [item: string]: boolean;
}

@bindable({ name: 'background', defaultValue: '#000000' })
@bindable({ name: 'foreground', defaultValue: '#FFFFFF' })
@bindable({ name: 'router' })
export class Sidebar {

  @observable
  public visibilityArray: Visible = {};
  
  toggleNode(itemIndex) {
    if (this.visibilityArray[itemIndex] === undefined || this.visibilityArray[itemIndex] === false) {
      this.visibilityArray[itemIndex] = true;
    } else {
      this.visibilityArray[itemIndex] = false;
    }
    return true;
  }

  isActive(isActive, itemIndex) {
    if (isActive) {
      this.visibilityArray[itemIndex] = true;
    }
  }
}