import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg==='' || arg.length < 3 ) return value;
    const resultSearch = [];
    for (const x of value){
      if (x.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultSearch.push(x);
      }
    }
    return resultSearch;
  }

}
