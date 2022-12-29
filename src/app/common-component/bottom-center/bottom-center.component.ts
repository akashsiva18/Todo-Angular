import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Task } from 'src/app/task';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-bottom-center',
  templateUrl: "./bottom-center.component.html",
  styleUrls: ['./bottom-center.component.scss']
})
export class BottomCenterComponent implements OnInit, DoCheck {

  @Input() public categoryTitle = "";
  @Input() public categoryList!: Category[];
  @Output() selectedTask = new EventEmitter<Task>();
  public tasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public completedTasks: Task[] = [];
  public isImportantTask = false;
  public hideCompletedTask = true;
  public currentDate = new Date();

  ngOnInit(): void {
    this.categoryTitle = "My Day"
    this.renderPendingTask();
    this.renderCompletedTask();
  }

  ngDoCheck(): void {
    this.renderPendingTask();
    this.renderCompletedTask();
  }

  public addTask(event: any) {
    let task: Task;
    let categories = [this.categoryTitle];
    if (this.categoryTitle !== "Tasks" && this.isDefaultTask(this.categoryTitle)) {
      categories.push("Tasks");
    }
    if (this.categoryTitle === "Important") {
      this.isImportantTask = true;
    } else {
      this.isImportantTask = false;
    }
    task = {
      id: this.tasks.length + 1,
      category: categories,
      name: event.target.value,
      note: "",
      isImportant: this.isImportantTask,
      isCompleted: false
    }
    this.tasks.unshift(task);
    event.target.value = "";
  }

  public isDefaultTask(name: string): boolean {
    let noOfDefaultCategory = 5;
    for (let i = 0; i < noOfDefaultCategory; i++) {
      if (this.categoryList[i].name === name) {
        return true;
      }
    }
    return false;
  }

  public renderPendingTask() {
    this.pendingTasks = [];
    this.tasks.forEach(task => {
      if (!task.isCompleted) {
        task.category.forEach(category => {
          if (category === this.categoryTitle) {
            this.pendingTasks.push(task);
          }
        });
      }
    });
  }

  public renderCompletedTask() {
    this.completedTasks = [];
    if (this.categoryTitle !== "Important") {
      this.tasks.forEach(task => {
        if (task.isCompleted) {
          task.category.forEach(category => {
            if (category === this.categoryTitle) {
              this.completedTasks.push(task);
            }
          });
        }
      });
    }
  }

  showAndHideCompletedTask() {
    if (this.hideCompletedTask == true) {
      this.hideCompletedTask = false;
    } else {
      this.hideCompletedTask = true;
    }
  }

  getSelectedTask(task:Task) {
    this.selectedTask.emit(task);
    console.log(task);
  }

}
