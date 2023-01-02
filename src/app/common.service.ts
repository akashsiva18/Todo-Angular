import { Injectable } from '@angular/core';
import { Category } from './category';
import { BehaviorSubject } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor() { }

  private categories: Category[] = [
    { id: 1, name: "My Day", iconClass: "fa-solid fa-sun", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 2, name: "Important", iconClass: "fa-regular fa-star", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 3, name: "Planned", iconClass: "fa-regular fa-calendar", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 4, name: "Assigned to Me", iconClass: "fa-solid fa-user", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 5, name: "Tasks", iconClass: "fa-solid fa-house", count: 0, isLastDefaultCategory: true, isDefaultCategory: true }
  ];

  private tasks: Task[] = [];

  private selectedCategory = new BehaviorSubject("My Day");
  currentSelectedCategory$ = this.selectedCategory.asObservable();
  public centerContainer = "center-container";
  public leftContainer = "left-container";
  public rightContainer = "right-container-hide";
  public sort = "sort";
  public suggestion = "suggestion";
  public important = "important";
  public isCenterContainerShirked = false;

  addTask(task: Task): void {
    this.tasks.unshift(task);
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  addCategories(category: Category): void {
    this.categories.push(category);
  }

  setSelectedCategory(categoryName: string): void {
    this.selectedCategory.next(categoryName);
  }

  getSelectedCategory(): BehaviorSubject<string> {
    return this.selectedCategory;
  }

  completedIconMouseIn(event: any): void {
    if (this.hasClass(event, "fa-regular fa-circle")) {
      event.target.className = "fa-regular fa-circle-check";
    }
  }

  completedIconMouseOut(event: any): void {
    if (this.hasClass(event, "fa-regular fa-circle-check")) {
      event.target.className = "fa-regular fa-circle";
    }
  }

  importantStatus(task: Task): void {
    if (task.isImportant === false) {
      task.isImportant = true;
      task.category.push("Important");
    } else {
      task.isImportant = false;
      let index = task.category.indexOf('Important');
      task.category.splice(index, 1);
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
    if (this.leftContainer === "left-container") {
      this.leftContainer = "left-container-hide";
      if (this.rightContainer === "right-container-hide") {
        this.centerContainer = "center-container-full-screen";
      } else {
        this.centerContainer = "center-container-left-screen";
      }
    } else {
      this.leftContainer = "left-container";
      if (this.rightContainer === "right-container-hide") {
        this.centerContainer = "center-container";
      } else {
        this.centerContainer = "shrink-center-container";
      }
    }
    this.centerContainerPropertiesChange();
  }

  rightContainerView(event: any): void {
    if (event.target.tagName == "LI") {
      this.rightContainer = "right-container";
      if (this.leftContainer === 'left-container') {
        this.centerContainer = "shrink-center-container";
      } else {
        this.centerContainer = "center-container-left-screen";
      }
      this.centerContainerPropertiesChange();
    }
  }

  hideRightContainer(): void {
    this.rightContainer = "right-container-hide";
    if (this.leftContainer === "left-container") {
      this.centerContainer = "center-container";
    } else {
      this.centerContainer = "center-container-full-screen";
    }
    this.centerContainerPropertiesChange();
  }

  centerContainerPropertiesChange(): void {
    if (this.centerContainer === "shrink-center-container") {
      this.important = "important-middle"
    } else if (this.centerContainer === "center-container-full-screen") {
      this.important = "important-full";
    } else {
      this.important = "important";
    }
  }
}
