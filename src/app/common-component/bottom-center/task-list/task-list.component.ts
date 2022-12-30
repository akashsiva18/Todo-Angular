import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  constructor(public commonService: CommonService) { }

  @Input() renderTasks!: Task[];
  @Output() selectedTask = new EventEmitter<Task>();

  getSelectedTask(task: Task) {
    this.selectedTask.emit(task);
  }
}
