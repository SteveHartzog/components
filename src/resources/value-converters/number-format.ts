import * as numeral from 'numeral';

export class NumberFormatValueConverter {
  toView(value, format) {
    if (value === null || value === undefined || isNaN(value)) {
      return null;
    }
    return numeral(value).format(format);
  }
}