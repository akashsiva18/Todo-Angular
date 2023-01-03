import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Task } from 'src/app/task';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/common.service';
import { Constant } from 'src/app/constant';

@Component({
  selector: 'app-bottom-center',
  templateUrl: "./bottom-center.component.html",
  styleUrls: ['./bottom-center.component.scss']
})
export class BottomCenterComponent implements OnInit, DoCheck {

  public selectedCategory!: Category;
  public categoryTitle = "";
  public categoryList: Category[] = this.commonService.getCategories();
  public taskName: string = "";
  public tasks: Task[] = this.commonService.getTasks();
  public pendingTasks: Task[] = [];
  public completedTasks: Task[] = [];
  public isImportantTask = false;
  public hideCompletedTask = true;
  public currentDate = new Date();
  public constant = new Constant();

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.currentSelectedCategory$.subscribe(category => this.categoryTitle = category.name);
    this.commonService.currentSelectedCategory$.subscribe(category => this.selectedCategory = category);
    this.renderPendingTask();
    this.renderCompletedTask();
  }

  ngDoCheck(): void {
    this.renderPendingTask();
    this.renderCompletedTask();
  }

  public addTask(): void {
    if (this.taskName.length > 0) {
      let task: Task;
      let selectedCategoryId = this.selectedCategory.id;
      let categoryIds: number[] = [this.selectedCategory.id];
      if (selectedCategoryId !== this.constant.TASK_ID && this.isDefaultTask(selectedCategoryId)) {
        categoryIds.push(this.constant.TASK_ID);
      }
      if (selectedCategoryId === this.constant.IMPORTANT_ID) {
        this.isImportantTask = true;
      } else {
        this.isImportantTask = false;
      }
      task = {
        id: this.commonService.getTasks.length + 1,
        categoryIds: categoryIds,
        name: this.taskName,
        note: "",
        isImportant: this.isImportantTask,
        isCompleted: false
      }
      this.commonService.addTask(task);
      this.taskName = "";
    }
    console.log(this.tasks);
     
  }

  public isDefaultTask(id: number): boolean {
    let noOfDefaultCategory = 5;
    for (let i = 0; i < noOfDefaultCategory; i++) {
      if (this.categoryList[i].id === id) {
        return true;
      }
    }
    return false;
  }

  public renderPendingTask(): void {
    this.pendingTasks = [];
    this.tasks.forEach(task => {
      if (!task.isCompleted) {
        task.categoryIds.forEach(categoryId => {
          if (categoryId === this.selectedCategory.id) {
            this.pendingTasks.push(task);
          }
        });
      }
    });
  }

  public renderCompletedTask(): void {
    this.completedTasks = [];
    if (!(this.selectedCategory.id === this.constant.IMPORTANT_ID
      || this.selectedCategory.id === this.constant.PLANNED_ID)) {
      this.tasks.forEach(task => {
        if (task.isCompleted) {
          task.categoryIds.forEach(categoryId => {
            if (categoryId === this.selectedCategory.id) {
              this.completedTasks.push(task);
            }
          });
        }
      });
    }
  }

  showAndHideCompletedTask(): void {
    if (this.hideCompletedTask == true) {
      this.hideCompletedTask = false;
    } else {
      this.hideCompletedTask = true;
    }
  }

  toggleMenuAction(): void {
    this.commonService.toggleMenuAction();
  }

}
