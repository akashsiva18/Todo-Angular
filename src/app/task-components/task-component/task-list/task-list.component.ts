import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from 'src/app/service/task.service'; 
import { Constant } from 'src/app/constant';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit,DoCheck{

  public filter:string = "";
  @Input() renderTasks!: Task[];

  constructor(public taskService: TaskService) { }

  ngDoCheck(): void {
    this.filter = this.taskService.filter;
  }

  ngOnInit(): void {  
  }

  public constant = new Constant();

  getSelectedTaskId(id: number): void {
    this.taskService.setSelectedTask(id);
    this.taskService.rightContainerView();
  }
  
  changeTaskImportantStatus(task: Task) {
    this.taskService.importantStatus(task);
  }

  changeTaskCompletedStatus(task:Task) {
    this.taskService.changeCompletedStatus(task);
  }
}
