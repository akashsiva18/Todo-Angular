import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';
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

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.selectedTask$.subscribe(task => this.selectedTask = task);
  }

  hideRightContainer(): void {
    this.commonService.hideRightContainer();
  }

  addNotes(): void {
    this.selectedTask.note = this.note;
  }
}
