import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Task } from 'src/app/task';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-bottom-center',
  templateUrl: "./bottom-center.component.html",
  styleUrls: ['./bottom-center.component.scss']
})
export class BottomCenterComponent implements OnInit {

  @Input() public categoryTitle?: String;
  public tasks: Task[] = [];
  public categoryName = "";
  public task?: Task;

  @ViewChildren(TaskListComponent) taskListComponent!: QueryList<TaskListComponent>;

  ngOnInit(): void {
    this.categoryTitle = "My Day"
  }

  public addTask(event: any) {
    if (this.categoryTitle !== undefined) {
      this.categoryName = this.categoryTitle.toString();
    }
    let categories = [this.categoryName];
    if (this.categoryName !== "Tasks") {
      categories.push("Tasks");
    }
    this.task = {
      id: this.tasks.length + 1,
      category: categories,
      name: event.target.value,
      note: "",
      isImportant: false,
      isCompleted: false
    }
    this.tasks.unshift(this.task);
    console.log(this.tasks);
    event.target.value = "";
  }
}
