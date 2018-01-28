import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as moment from 'moment';
import SampleData from './SampleDataModel';

let sampleData: SampleData[] = [
  {
    id: 0,
    character: 'Luke Skywalker',
    lastEpisode: 'VIII',
    actor: 'Mark Hamil',
    salary: 6000000
  },
  {
    id: 1,
    character: 'Leia Organa Solo',
    lastEpisode: 'VIII',
    actor: 'Carrie Fisher',
    salary: 2000000
  },
  {
    id: 2,
    character: 'Han Solo',
    lastEpisode: 'VII',
    actor: 'Harison Ford',
    salary: 34700000
  },
  {
    id: 3,
    character: 'Rey',
    lastEpisode: 'VIII',
    actor: 'Daisy Ridley',
    salary: 250000
  },
  {
    id: 4,
    character: 'Ben Solo (Kylo Ren)',
    lastEpisode: 'VIII',
    actor: 'Adam Driver',
    salary: 2500000
  },
  {
    id: 5,
    character: 'Finn',
    lastEpisode: 'VIII',
    actor: 'John Boyega',
    salary: 250000
  },
  {
    id: 6,
    character: 'Supreme Leader Snoke',
    lastEpisode: 'VIII',
    actor: 'Andy Serkis',
    salary: 250000
  },
  {
    id: 7,
    character: 'Captain Phasma',
    lastEpisode: 'VIII',
    actor: 'Gwendoline Christie',
    salary: 250000
  },
  {
    id: 8,
    character: 'Poe Dameron',
    lastEpisode: 'VIII',
    actor: 'Oscar Isaac',
    salary: 250000
  },
  {
    id: 9,
    character: 'General Hux',
    lastEpisode: 'VIII',
    actor: 'Domhnall Gleeson',
    salary: 250000
  },
  {
    id: 10,
    character: 'Maz Kanata',
    lastEpisode: 'VIII',
    actor: 'Lupita Nong\'o',
    salary: 250000
  },
  {
    id: 11,
    character: 'Vice Admiral Holdo',
    lastEpisode: 'VIII',
    actor: 'Laura Dern',
    salary: 250000
  },
  {
    id: 12,
    character: 'Paige Tico',
    lastEpisode: 'VIII',
    actor: 'Ngô Thanh Vân',
    salary: 250000
  }
];

@inject(EventAggregator)
export class SampleGrid {
  items: SampleData[];

  public buttons = [
    {
      title: 'Quick Filter: \'Create\'',
      action: 'showCreateOnly',
      icon: 'filter'
    },
    {
      title: 'Hide/Show ID',
      action: 'hideShowId',
      icon: 'key'
    },
    {
      title: 'Enable/Disable Paging',
      action: 'enableDisablePaging',
      icon: 'align-justify'
    },
    {
      title: 'Enable/Disable Sorting',
      action: 'enableDisableSorting',
      icon: 'sort-amount-desc'
    },
    {
      title: 'Set PageSize',
      action: 'setPageSize5',
      icon: 'square'
    },
    {
      title: 'Set PageSize',
      action: 'setPageSize10',
      icon: 'square-o'
    },
    {
      title: 'Add/Remove Border',
      action: 'addRemoveBorder',
      icon: 'table'
    },
    {
      title: 'Add/Remove Grid',
      action: 'addRemoveGrid',
      icon: 'th'
    },
    {
      title: 'Enable/Disable Edit',
      action: 'enableDisableEdit',
      icon: 'pencil'
    },
    {
      title: 'Change Theme: \'Default\'',
      action: 'changeThemeDefault',
      icon: 'list'
    },
    {
      title: 'Change Theme: \'Alt\'',
      action: 'changeThemeAlt',
      icon: 'list-alt'
    },
    {
      title: 'Change Theme: \'Blue\'',
      action: 'changeThemeBlue',
      icon: 'tint'
    }
  ];

  constructor(private events: EventAggregator) {
  }

  activate() {
    this.items = sampleData;
  }

  hideShowId() {
    this.changeGridAttribute('show-id', 'true');
  }

  enableDisablePaging() {
    this.changeGridAttribute('allow-paging', 'false');
  }

  enableDisableSorting() {
    this.changeGridAttribute('enable-sorting', 'false');
  }

  setPageSize5() {
    this.changeGridAttribute('page-size', '5');
  }

  setPageSize10() {
    this.changeGridAttribute('page-size', '10');
  }

  addRemoveBorder() {
    this.changeGridAttribute('show-border', 'false');
  }

  addRemoveGrid() {
    this.changeGridAttribute('show-grid', 'false');
  }

  enableDisableEdit() {
    this.changeGridAttribute('allow-edit', 'false');
  }

  changeThemeDefault() {
    this.changeGridAttribute('theme', 'default');
  }

  changeThemeAlt() {
    this.changeGridAttribute('theme', 'alt');
  }

  changeThemeBlue() {
    this.changeGridAttribute('theme', 'blue');
  }

  changeGridAttribute(attributeName, newValue) {
    let attribute = this['grid'].attributes.getNamedItem(attributeName);
    let oldValue;
    if (!attribute) {
      attribute = document.createAttribute(attributeName);
      attribute.value = newValue;
    } else {
      oldValue = attribute.value;
      // if true/false, flip it.
      if (oldValue === 'true' || oldValue === 'false') {
        if (oldValue === 'true') {
          attribute.value = 'false';
        } else {
          attribute.value = 'true';
        }
      } else {
        // otherwise a static set
        attribute.value = newValue;
      }
    }
    this['grid'].attributes.setNamedItem(attribute);
  }

  deleteMe(item) {
    console.log(`Delete Permission: (${item.id}) '${item.name}'`);
  }
}