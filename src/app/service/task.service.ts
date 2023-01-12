import { Injectable } from '@angular/core';
import { Category } from '../category';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Task } from '../task';
import { Constant } from '../constant';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  public constant = new Constant;
  public filter: string = "";
  public filterSubject = new BehaviorSubject(this.filter);
  public filter$ = this.filterSubject.asObservable();
  public categories: Category[] = [];
  public categoriesBehaviorSubject = new BehaviorSubject(this.categories);
  public categories$ = this.categoriesBehaviorSubject.asObservable();
  private task: Task = {
    id: 0,
    name: '',
    categoryIds: [],
    note: '',
    isImportant: false,
    isCompleted: false
  };
  private retrievedTasks = new Subject<Task[]>();
  public retrievedTasks$ = this.retrievedTasks.asObservable();
  public firstCategory = { id: 1, name: "My Day", iconClass: "fa-solid fa-sun", count: 0, isLastDefaultCategory: false, isDefaultCategory: true };
  private selectedCategory = new BehaviorSubject(this.firstCategory);
  public currentSelectedCategory$ = this.selectedCategory.asObservable();
  private selectedTask = new BehaviorSubject(this.task);
  public selectedTask$ = this.selectedTask.asObservable();
  public viewLeftContainer = true;
  public viewRightContainer = false;
  public applyClassCenter = this.constant.DEFAULT_VIEW;
  public currentTaskSelectedId = 0;

  constructor(private dataService: DataService) {
    this.setSelectedTask(1);
  }

  retrieveTasks() {
    this.dataService.getTasks().subscribe((tasks: any) => {
      this.retrievedTasks.next(tasks.reverse());
    })
  }

  setCategories(categories: Category[]): void {
    this.categories = categories;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  setSelectedTask(taskId?:number): void {
    if(taskId === undefined) {
      taskId = this.currentTaskSelectedId;
    }
    this.dataService.getTaskById(taskId).subscribe((task: any) => {
      this.selectedTask.next(task);
      this.currentTaskSelectedId = task.id;
    })
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
    this.dataService.addTask(task).subscribe(() => {
      this.retrieveTasks();
    })
  }

  changeCompletedStatus(task: Task): void {
    if (task.isCompleted == true) {
      task.isCompleted = false;
    } else {
      task.isCompleted = true;
    }
    this.dataService.addTask(task).subscribe(() => {
      this.retrieveTasks();
    })
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
