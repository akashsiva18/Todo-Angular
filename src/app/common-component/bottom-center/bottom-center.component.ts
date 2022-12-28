import { Component, DoCheck, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Task } from 'src/app/task';
import { TaskListComponent } from './task-list/task-list.component';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-bottom-center',
  templateUrl: "./bottom-center.component.html",
  styleUrls: ['./bottom-center.component.scss']
})
export class BottomCenterComponent implements OnInit, DoCheck {

  @Input() public categoryTitle?: String;
  @Input() public categoryList!: Category[];
  public tasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public categoryName = "";
  public task?: Task;
  public noOfDefaultCategory = 5;

  ngOnInit(): void {
    this.categoryTitle = "My Day"
    this.renderPendingTask();
  }

  ngDoCheck(): void {
    this.renderPendingTask();
  }

  public addTask(event: any) {
    if (this.categoryTitle !== undefined) {
      this.categoryName = this.categoryTitle.toString();
    }
    let categories = [this.categoryName];
    if (this.categoryName !== "Tasks" && this.isDefaultTask(this.categoryName)) {
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

  public isDefaultTask(name:string): boolean {
    for(let i =0; i < 5; i++) {
      if(this.categoryList[i].name === name) {
        return true;
      }
    }
    return false;
  }

  public renderPendingTask() {
    console.log(this.categoryTitle);
    this.pendingTasks = [];
    this.tasks.forEach(task => {
      task.category.forEach(category => {
        if (category === this.categoryTitle) {
          this.pendingTasks.push(task);
        }
      });
    });
  }
}
