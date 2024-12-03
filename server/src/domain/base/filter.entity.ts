import { Like } from 'typeorm';

export class BaseFilter {
  [key: string]: any;

  toQueryFilter(): any {
    const queryFilter: any = {};

    // Define the fields to ignore
    const ignoredFields = ['page', 'size', 'sort', 'cacheBuster'];

    for (const key of Object.keys(this)) {
      if (this[key] !== undefined && !ignoredFields.includes(key)) {
        // Check if the key contains a dot, indicating a nested property
        if (key.includes('.')) {
          const keys = key.split('.');
          const [parentKey, childKey] = keys;

          if (!queryFilter[parentKey]) {
            queryFilter[parentKey] = {};
          }

          // Check for "contains" and "equals" operations
          if (childKey.endsWith('_contains')) {
            queryFilter[parentKey][childKey.slice(0, -9)] = Like(`%${this[key]}%`);
          } else if (childKey.endsWith('_equals')) {
            queryFilter[parentKey][childKey.slice(0, -7)] = this[key];
          } else {
            queryFilter[parentKey][childKey] = this[key];
          }
        } else {
          // Directly map fields without dots
          if (key.endsWith('_contains')) {
            queryFilter[key.slice(0, -9)] = Like(`%${this[key]}%`);
          } else if (key.endsWith('_equals')) {
            queryFilter[key.slice(0, -7)] = this[key];
          } else {
            queryFilter[key] = this[key];
          }
        }
      }
    }

    return queryFilter;
  }
}
