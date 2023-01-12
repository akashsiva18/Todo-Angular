import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
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

  constructor(public taskService: TaskService, public dataService: DataService) { }

  ngOnInit(): void {
    this.taskService.setSelectedTask();
    this.taskService.selectedTask$.subscribe(task => {
      this.selectedTask = task;
      this.note = task.note;
    });
  }

  hideRightContainer(): void {
    this.taskService.hideRightContainer();
  }

  addNotes(): void {
    this.selectedTask.note = this.note;
    this.dataService.addTask(this.selectedTask).subscribe(() => {
    });
  }
}
