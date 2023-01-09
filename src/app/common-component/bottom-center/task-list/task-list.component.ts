import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Constant } from 'src/app/constant';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit,DoCheck{

  public filter:string = "";

  constructor(public taskService: TaskService) { }
  ngDoCheck(): void {
    this.filter = this.taskService.filter;
  }

  ngOnInit(): void {
    
  }

  @Input() renderTasks!: Task[];

  public constant = new Constant();

  getSelectedTask(task: Task): void {
    this.taskService.setSelectedTask(task);
    this.taskService.rightContainerView();
  }
  
  changeTaskImportantStatus(task: Task) {
    this.taskService.importantStatus(task);
  }

  changeTaskCompletedStatus(task:Task) {
    this.taskService.changeCompletedStatus(task);
  }

}
