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
  ngOnInit(): void {
    this.selectedTask = {
      id: 0,
      name: '',
      category: [],
      note: '',
      isImportant: false,
      isCompleted: false
    };
  }

  constructor (public commonService:CommonService) {}
  
  @Input() selectedTask!: Task;

  hideRightContainer() {
    this.commonService.hideRightContainer();
  }

  addNotes(event:any) {
    this.selectedTask.note = event.target.value;
    console.log(this.selectedTask);
  }
}
