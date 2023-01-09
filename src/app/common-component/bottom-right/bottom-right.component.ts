import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Task } from 'src/app/task';
import { TaskListComponent } from '../bottom-center/task-list/task-list.component';

@Component({
  selector: 'app-bottom-right',
  templateUrl: './bottom-right.component.html',
  styleUrls: ['./bottom-right.component.scss']
})
export class BottomRightComponent implements OnInit {

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
