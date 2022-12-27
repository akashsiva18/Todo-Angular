import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[] = [];
  @Input() titleName = "";
  public pendingTasks: Task[] = [];

  ngOnInit(): void {
    this.renderPendingTask();
  }
  constructor(private element: ElementRef) {}

  public renderPendingTask() {
    this.pendingTasks = [];
    this.tasks.forEach(task => {
      task.category.forEach(category => {
        console.log(category);
        if (category === this.titleName) {
          this.pendingTasks.push(task);        }
      });
    });
  }

}
