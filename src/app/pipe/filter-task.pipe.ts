import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';

@Pipe({
  name : "filterTask",
  pure: false
})


export class FilterTaskPipe implements PipeTransform {

  /**
   * Takes an array of tasks and a filter string as arguments, and returns a new array of tasks that
   * includes only the tasks whose name property includes the filter string
   * 
   * @param {any} value - The array of tasks that filtering.
   * @param {string} filter - The value of the filter input.
   * @return An array of tasks that have a name that includes the filter.
   */
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
