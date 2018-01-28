import { bindable, observable } from 'aurelia-framework';

interface Visible {
  [item: string]: boolean;
}

@bindable({ name: 'cards' })
export class Card {

  @observable
  public visibilityArray: Visible = {};

  reveal(itemIndex) {
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