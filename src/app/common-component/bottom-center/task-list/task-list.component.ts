import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/common.service';
import { Constant } from 'src/app/constant';
import { Task } from 'src/app/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit{

  constructor(public commonService: CommonService) { }
  ngOnInit(): void {
  }

  @Input() renderTasks!: Task[];

  public constant = new Constant();

  getSelectedTask(task: Task): void {
    this.commonService.setSelectedTask(task);
    this.commonService.rightContainerView();
  }
}
