import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameCase'
})
export class NameCasePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    let name:string[]=value.toLowerCase().split(' ');
    name=name.filter(x=>{return x.length})
    name=name.map(x=>{return x.slice(0,1).toUpperCase()+x.slice(1)})
    return name;
  }

}
