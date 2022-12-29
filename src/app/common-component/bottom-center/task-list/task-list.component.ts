import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Input() titleName = "";
  @Input() renderTasks!: Task[];
  @Output() selectedTask = new EventEmitter<Task>();

  importantStatus(event: any, task: Task) {
    if (this.hasClass(event, "fa-regular fa-star")) {
      task.isImportant = true;
      task.category.push("Important");
    } else {
      task.isImportant = false;
      let index = task.category.indexOf('Important');
      task.category.splice(index, 1);
    }
  }

  completedIconHover(event: any) {
    if (this.hasClass(event, "fa-regular fa-circle")) {
      event.target.className = "fa-regular fa-circle-check";
    } else if (this.hasClass(event,"fa-regular fa-circle-check")) {
      event.target.className = "fa-regular fa-circle";
    }
  }

  changeCompletedStatus(event: any, task: Task) {
    if (this.hasClass(event, "fa-regular fa-circle-check")) {
      task.isCompleted = true;
    } else {
      task.isCompleted = false;
    }
  }

  getSelectedTask(task:Task) {
    this.selectedTask.emit(task);
  }

  hasClass(event: any, className: string) {
    return event.target.className === className;
  }
}
