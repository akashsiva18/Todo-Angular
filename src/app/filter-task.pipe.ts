import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name : "filterTask",
  pure: false
})


export class FilterTaskPipe implements PipeTransform {

  transform(value: any, filter: string):Task[] {
    if (value.length === 0 || filter === '') {
      return value;
    }
    const tasks = [];
    for (const task of value) {
      if (task.name.includes(filter)) {
        tasks.push(task);
      }
    }
    return tasks;
  }
}
