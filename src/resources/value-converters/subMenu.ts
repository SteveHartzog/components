export class SubMenuValueConverter {
  toView(routerMenuItems) {
    let menuItems = [];
    routerMenuItems.forEach(function (menutItem) {
      if (menutItem.settings.parentMenu) {
        // Submenu children
        let parent = menuItems.find(x => x.title === menutItem.settings.parentMenu);
        // If it doesn't exist, then something went wrong, so not checking 
        parent.children.push(menutItem);
      } else {
        // Just insert.  It should not be there multiple times or it's a bad route
        menuItems[menutItem] = menuItems[menutItem] || [];
        // Create empty children
        menutItem.children = [];
        menuItems.push(menutItem);
      }
    });

    return menuItems;
  }
}