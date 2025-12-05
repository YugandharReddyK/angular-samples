import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, field?: string): any[] {
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      if (field) {
        return item[field]?.toLowerCase().includes(searchText);
      }
      // Search in all string properties
      return Object.values(item).some(val => 
        String(val).toLowerCase().includes(searchText)
      );
    });
  }

}
