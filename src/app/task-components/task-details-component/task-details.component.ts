import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service'; 
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  public selectedTask!: Task;

  public note = "";

  constructor(public TaskService: TaskService) { }

  ngOnInit(): void {
    this.TaskService.selectedTask$.subscribe(task => this.selectedTask = task);
  }

  hideRightContainer(): void {
    this.TaskService.hideRightContainer();
  }

  addNotes(): void {

    this.selectedTask.note = this.note;
  }
}
