import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service'; 
import { Constant } from 'src/app/constant';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{

  public filter:string = "";
  @Input() renderTasks!: Task[];

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {  
    this.taskService.filter$.subscribe((filter) => this.filter = filter);
  }

  public constant = new Constant();

  public getSelectedTaskId(id: number): void {
    this.taskService.setSelectedTask(id);
    this.taskService.rightContainerView();
  }
  
  public changeTaskImportantStatus(task: Task) {
    this.taskService.importantStatus(task);
  }

  public changeTaskCompletedStatus(task:Task) {
    this.taskService.changeCompletedStatus(task);
  }
}
