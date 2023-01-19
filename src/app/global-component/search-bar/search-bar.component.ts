import { Component } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(private taskService: TaskService) { }

  /**
   * takes a string as an argument and sets the filter property of the taskService to the
   * value of the input
   * 
   * @param {string} input - The value of the input field.
   */
  setSearchTask(input: string): void {
    this.taskService.filter = input;
  }

}
