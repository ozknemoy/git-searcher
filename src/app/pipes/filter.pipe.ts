// @ts-nocheck
import { Pipe } from '@angular/core';

/**
 * @Component pipe из angularJS
 */
@Pipe({
  name: 'filter',
  pure: false, // ууу будет жарко. и когда очень хочется этот флажок, то можно ;)
})
export class FilterPipe {


  static isInvalidPrimitive(value): boolean {
    return value === null || value === undefined || value === '' || ((typeof value === 'string' && value.trim() === ''))
  }

  static filterByString(filter) {
    if (filter) {
      filter = filter.toLowerCase();
    }
    return value => {
      // value должна быть строка
      console.log(!filter || (!this.isInvalidPrimitive(value) ? (value + '').toLowerCase().indexOf(filter) !== -1 : false));
      return !filter || (!this.isInvalidPrimitive(value) ? (value + '').toLowerCase().indexOf(filter) !== -1 : false);
    }
  }

  static filterByBoolean(filter) {
    return value => {
      return Boolean(value) === filter;
    }
  }

  static filterByObject(filter) {
    return value => {
      for (let key in filter) {
        if (!value.hasOwnProperty(key) && !Object.getOwnPropertyDescriptor(Object.getPrototypeOf(value), key)) {
          return false;
        }

        let val = this.getValue(value[key]);
        const type = typeof filter[key];
        let isMatching;

        if (type === 'boolean') {
          isMatching = this.filterByBoolean(filter[key])(val);
        } else if (type === 'string') {
          isMatching = this.filterByString(filter[key])(val);
        } else if (type === 'object') {
          isMatching = this.filterByObject(filter[key])(val);
        } else {
          isMatching = FilterPipe.filterDefault(filter[key])(val);
        }

        if (!isMatching) {
          return false;
        }
      }

      return true;
    }
  }

  static filterByObjectOr(row, filter) {
    return Object.keys(filter).some((key) => FilterPipe.filterByObject({[key]: filter[key]})(row))
  }

  /**
   * Checks function's value if type is function otherwise same value
   * @param value
   * @returns {any}
   */
  static getValue(value: any) {
    return typeof value === 'function' ? value() : value;
  }

  /**
   * Defatul filterDefault function
   *
   * @param filter
   * @returns {(value:any)=>boolean}
   */
  static filterDefault(filter) {
    return value => {
      return !filter || filter == value;
    }
  }

  static isNumber(value) {
    return !isNaN(parseInt(value, 10)) && isFinite(value);
  }

  // or ищет по объект фильтра как ИЛИ
  transform<T>(array: T[], filter: any, or?: boolean): T[] {
    const type = typeof filter;

    if (!array) {
      return array;
    }

    if (type === 'boolean') {
      return array.filter(FilterPipe.filterByBoolean(filter));
    }

    if (type === 'string') {
      if (FilterPipe.isNumber(filter)) {
        return array.filter(FilterPipe.filterDefault(filter));
      }

      return array.filter(FilterPipe.filterByString(filter));
    }

    if (type === 'object' && or) {
      console.log(array.filter((row) => FilterPipe.filterByObjectOr(row, filter)).length);
      return array.filter((row) => FilterPipe.filterByObjectOr(row, filter));
    }

    if (type === 'object') {
      return array.filter(FilterPipe.filterByObject(filter));
    }

    if (type === 'function') {
      return array.filter(filter);
    }

    return array.filter(FilterPipe.filterDefault(filter));
  }
}
