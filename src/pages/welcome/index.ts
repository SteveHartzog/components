class Feature {
  image?: string;
  icon?: string;
  title: string;
  description: string;
  link: string;
  constructor(data) {
    Object.assign(this, data);
  }
}

export class Welcome {
  heading: string = 'Steve\'s component samples. A portfolio for those that asked.';
  features: Feature[] = [
    new Feature({
      title: 'Grid',
      link: 'grid',
      icon: 'fa-th',
      description: 'This is an example usage of Grid... with ActionBar.'
    }),
    new Feature({
      title: 'ActionBar',
      link: 'actionbar',
      icon: 'fa-puzzle-piece',
      description: 'This is an example usage of the ActionBar.'
    })
  ];
}