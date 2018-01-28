import { inject, bindable, bindingMode, children } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as _ from 'lodash';

@inject(EventAggregator, Element)
export class Grid {
  @children('column') columns;
  @bindable() theme: any;
  @bindable() showId: any;
  @bindable() rows;
  @bindable() showGrid: string = 'true';
  @bindable() showBorder: string = 'true';
  @bindable() allowEdit: string = 'false';
  @bindable() allowPaging: string = 'true';
  @bindable() enableSorting: string = 'true';
  @bindable() editCommand;
  @bindable() pageSize: number = 10;
  @bindable() defaultSort: string;
  @bindable() width: string;
  maxPages: number;
  currentPage: number = 1;
  currentSortColumn: string;
  currentSortDirection: string;
  currentFilter: string;
  originalRows;
  pagedRows;
  parent;
  objectKeys;

  constructor(private events: EventAggregator, private element: Element) {
    let self = this;
    this.events.subscribe('grid.refresh.row', (itemUpdate) => {
      let itemIndex = _.indexOf(self.originalRows, _.find(self.originalRows, { id: itemUpdate.id }));
      self.originalRows.splice(itemIndex, 1, itemUpdate);

      itemIndex = _.indexOf(self.rows, _.find(self.rows, { id: itemUpdate.id }));
      self.rows.splice(itemIndex, 1, itemUpdate);

      if (self.pagedRows && self.pagedRows.length > 0) {
        itemIndex = _.indexOf(self.pagedRows, _.find(self.pagedRows, { id: itemUpdate.id }));
        self.pagedRows.splice(itemIndex, 1, itemUpdate);
      }
    });
    this.events.subscribe('grid.refresh', (items) => {
      self.originalRows = items;
      self.rows = items;

      this.setupSorting(this.enableSorting);
      this.setupPaging(this.allowPaging);
      self.filter(self.currentFilter);
    });

    this.events.subscribe('grid.filter', (filter: string) => {
      this.requestFilter(filter);
    });
    this.events.subscribe('grid.filter.clear', (filter: string) => {
      this.requestFilter();
    });
  }

  bind(bindingContext) {
    this.parent = bindingContext;
    this.objectKeys = Object.keys(this.rows[0]);
    this.originalRows = this.rows;
    this.theme = this.theme || 'default';

    this.setupSorting(this.enableSorting);
    this.setupPaging(this.allowPaging);

    window['MutationObserver'] = window['MutationObserver']
      || window['WebKitMutationObserver']
      || window['MozMutationObserver'];

    // Fix aurelia ignoring element property changes
    let target = this['element'];
    let self = this;
    let observer = new MutationObserver(function(mutation) {
      let attributeName = mutation['0']['attributeName'];
      let attributeValue = mutation['0'].target.attributes[attributeName].value;
      switch (attributeName) {
        case 'show-id':
          self.changeBoundValue('showId', attributeValue);
          break;
        case 'allow-paging':
          self.changeBoundValue('allowPaging', attributeValue);
          break;
        case 'enable-sorting':
          self.changeBoundValue('enableSorting', attributeValue);
          break;
        case 'page-size':
          self.changeBoundValue('pageSize', attributeValue);
          break;
        case 'show-grid':
          self.changeBoundValue('showGrid', attributeValue);
          break;
        case 'show-border':
          self.changeBoundValue('showBorder', attributeValue);
          break;
        case 'allow-edit':
          self.changeBoundValue('allowEdit', attributeValue);
          break;
        case 'theme':
          self.changeBoundValue('theme', attributeValue);
      }
    });
    observer.observe(target, { attributes: true });
    // how to stop observing
    // observer.disconnect();
  }

  changeBoundValue(attribute, newValue) {
    this[attribute] = newValue;
    if (attribute === 'pageSize') {
      this.pagedRows = this.getPagedRow();
    }
  }

  setupSorting(enableSorting) {
    if (enableSorting === 'true' && this.defaultSort) {
      this.sort(this.defaultSort, 'asc');
    }
  }

  setupPaging(allowPaging) {
    if (allowPaging === 'true') {
      // set paginated rows to current and overwrite original so it's always paged
      this.pagedRows = this.getPagedRow();
    }
  }

  clickEdit(item) {
    this.parent[this.editCommand](item);
  }

  pageClick(request: string) {
    switch (request) {
      case 'next':
        if (this.currentPage < this.maxPages) {
          this.pagedRows = this.getPagedRow(this.currentPage + 1);
        }
        break;
      case 'previous':
        if (this.currentPage > 1) {
          this.pagedRows = this.getPagedRow(this.currentPage - 1);
        }
        break;
    }
  }

  columnClick(dataField) {
    // Get new sort direction
    let newSortDirection;
    if (dataField === this.currentSortColumn) {
      switch (this.currentSortDirection) {
        case 'asc':
          newSortDirection = 'desc';
          break;
        case 'desc':
          newSortDirection = null;
          break;
        default:
          newSortDirection = 'asc';
          break;
      }
    } else {
      newSortDirection = 'asc';
    }
    // Sort rows
    this.sort(dataField, newSortDirection);

    // Update paged rows
    if (this.allowPaging) {
      this.pagedRows = this.getPagedRow(this.currentPage);
    }
  }

  getColumnIndex(dataField) {
    let columns = Object.keys(this.rows[0]);
    for (let column in columns) {
      if (dataField === columns[column]) {
        return column;
      }
    }
  }

  requestFilter(filter?) {
    // Reapply filter to originalRows if set
    if (filter) {
      this.filter(filter);
    } else {
      this.currentFilter = '';
      this.rows = this.originalRows;
    }

    // Reapply sort if needed
    if (this.currentSortColumn.length > 0) {
      this.sort(this.currentSortColumn, this.currentSortDirection);
    }

    // Repaginate if needed
    if (this.allowPaging) {
      this.pagedRows = this.getPagedRow();
    }
  }

  filter(filter) {
    this.rows = _.filter(this.originalRows, (item) => {
      let objectKeys = Object.keys(item);
      let filterExists = false;
      for (let key in objectKeys) {
        let propName = objectKeys[key];
        let propType = typeof item[propName];
        // only search string fields
        if (propType === 'string' && item[propName].toLowerCase().includes(filter.toLowerCase())) {
          filterExists = true;
        }
      }
      return filterExists;
    });
    this.currentFilter = filter;
  }

  sort(dataField, sortDirection?) {
    if (this.rows.length > 0) {
      let columnIndex = this.getColumnIndex(dataField);
      switch (sortDirection) {
        case 'asc':
          this.currentSortColumn = dataField;
          this.currentSortDirection = 'asc';
          this.rows = _.sortBy(this.rows, this.objectKeys[columnIndex]);
          break;
        case 'desc':
          this.currentSortColumn = dataField;
          this.currentSortDirection = 'desc';
          this.rows = _.sortBy(this.rows, this.objectKeys[columnIndex]).reverse();
          break;
        default:
          this.currentSortColumn = null;
          this.currentSortDirection = null;
          this.rows = _.sortBy(this.rows, this.objectKeys[0]);
          this.rows = this.rows;
          break;
      }
    }
  }

  getPagedRow(page?) {
    if (this.rows.length > 0) {
      this.maxPages = Math.ceil(this.rows.length / this.pageSize);
      let newPage = page || 1;
      if (newPage <= this.maxPages && newPage >= 0) {
        let offset = (newPage - 1) * this.pageSize;
        let paginatedItems;
        try {
          paginatedItems = _.take(_.slice(this.rows, offset), this.pageSize);
          this.currentPage = newPage;
        } catch (error) {
          console.log(error);
        }
        return paginatedItems;
      }
      return this.rows;
    } else {
      this.maxPages = 0;
      this.currentPage = 1;
      return this.rows;
    }
  }
}