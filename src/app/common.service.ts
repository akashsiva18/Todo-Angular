import { Injectable, OnInit } from '@angular/core';
import { Category } from './category';
import { BehaviorSubject, elementAt } from 'rxjs';
import { Task } from './task';
import { Constant } from './constant';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class CommonService implements OnInit{

  constructor(private dataService:DataService) { 
  }
  ngOnInit(): void {
    this.setCategory();
  }

  setCategory() {
    this.dataService.getCategory().subscribe((res:any)=>{
      // this.categories = res;
      res.forEach((element:Category) => {
        this.categories2.push(element);
      })
      console.log(res);
    })
    console.log(this.categories);
  }

  public constant = new Constant;
  public categories2: Category[] = [];

  private categories: Category[] = [
    { id: 1, name: "My Day", iconClass: "fa-solid fa-sun", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 2, name: "Important", iconClass: "fa-regular fa-star", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 3, name: "Planned", iconClass: "fa-regular fa-calendar", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 4, name: "Assigned to Me", iconClass: "fa-solid fa-user", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 5, name: "Tasks", iconClass: "fa-solid fa-house", count: 0, isLastDefaultCategory: true, isDefaultCategory: true }
  ];

  private tasks: Task[] = [];

  private task: Task = {
    id: 0,
    name: '',
    categoryIds: [],
    note: '',
    isImportant: false,
    isCompleted: false
  };

  private selectedCategory = new BehaviorSubject(this.categories[0]);
  public currentSelectedCategory$ = this.selectedCategory.asObservable();
  private selectedTask = new BehaviorSubject(this.task);
  public selectedTask$ = this.selectedTask.asObservable();
  public viewLeftContainer = true;
  public viewRightContainer = false;
  public applyClassCenter = this.constant.DEFAULT_VIEW;

  addTask(task: Task): void {
    this.tasks.unshift(task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  setSelectedTask(task: Task) {
    this.selectedTask.next(task);
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategories(category: Category): void {
    this.categories.push(category);
  }

  setSelectedCategory(category: Category): void {
    this.selectedCategory.next(category);
  }

  getSelectedCategory(): BehaviorSubject<Category> {
    return this.selectedCategory;
  }

  completedIconMouseIn(event: any): void {
    if (this.hasClass(event, this.constant.COMPLETED_MOUSE_OUT)) {
      event.target.className = this.constant.COMPLETED_MOUSE_IN;
    }
  }

  completedIconMouseOut(event: any): void {
    if (this.hasClass(event, this.constant.COMPLETED_MOUSE_IN)) {
      event.target.className = this.constant.COMPLETED_MOUSE_OUT;
    }
  }

  importantStatus(task: Task): void {
    if (task.isImportant === false) {
      task.isImportant = true;
      task.categoryIds.push(2);
    } else {
      task.isImportant = false;
      let index = task.categoryIds.indexOf(2);
      task.categoryIds.splice(index, 1);
    }
  }

  changeCompletedStatus(task: Task): void {
    if (task.isCompleted == true) {
      task.isCompleted = false;
    } else {
      task.isCompleted = true;
    }
  }

  hasClass(event: any, className: string): boolean {
    return event.target.className === className;
  }

  toggleMenuAction(): void {
    if (this.viewLeftContainer === true) {
      this.viewLeftContainer = false;
      if (this.viewRightContainer === false) {
        this.applyClassCenter = this.constant.FULL_VIEW;
      } else {
        this.applyClassCenter = this.constant.LEFT_VIEW;
      }
    } else {
      this.viewLeftContainer = true;
      if (this.viewRightContainer === false) {
        this.applyClassCenter = this.constant.DEFAULT_VIEW;
      } else {
        this.applyClassCenter = this.constant.CENTER_VIEW;
      }
    }
  }

  rightContainerView(): void {
    this.viewRightContainer = true;
    if (this.viewLeftContainer === true) {
      this.applyClassCenter = this.constant.CENTER_VIEW;
    } else {
      this.applyClassCenter = this.constant.LEFT_VIEW;
    }
  }

  hideRightContainer(): void {
    this.viewRightContainer = false;
    if (this.viewLeftContainer === true) {
      this.applyClassCenter = this.constant.DEFAULT_VIEW;
    } else {
      this.applyClassCenter = this.constant.FULL_VIEW;
    }
  }
}
