import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() tasks: Task[] = [];
  @Input() titleName = "";
  @Input() pendingTasks!: Task[];

  importantStatus(event:any) {
    if(event.target.className == "fa-regular fa-star") {
      event.target.className = "fa-solid fa-star";
    } else {
      event.target.className = "fa-regular fa-star";
    }
  }

  
}
