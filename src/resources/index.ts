import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/actionbar/index'),
    PLATFORM.moduleName('./elements/actionbar/action'),
    PLATFORM.moduleName('./elements/card/index'),
    PLATFORM.moduleName('./elements/features/index'),
    PLATFORM.moduleName('./elements/features/feature.html'),
    PLATFORM.moduleName('./elements/grid/index'),
    PLATFORM.moduleName('./elements/grid/column'),
    PLATFORM.moduleName('./elements/header.html'),
    PLATFORM.moduleName('./elements/nav/sidebar'),
    PLATFORM.moduleName('./value-converters/currency-format'),
    PLATFORM.moduleName('./value-converters/date-format'),
    PLATFORM.moduleName('./value-converters/number-format'),
    PLATFORM.moduleName('./value-converters/subMenu')
  ]);
}
