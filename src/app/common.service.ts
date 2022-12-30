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

  private tasks:Task[] =[];

  private selectedCategory = new BehaviorSubject("My Day");
  currentSelectedCategory$ = this.selectedCategory.asObservable();

  // private selectedTask = new BehaviorSubject();
  // selectedTask$ = this.selectedTask.asObservable();


  addTask(task:Task) {
    this.tasks.unshift(task);
  }

  getTasks() {
    return this.tasks;
  }

  getCategories() {
    return this.categories;
  }

  addCategories(category: Category) {
    this.categories.push(category);
  }

  setSelectedCategory(categoryName: string) {
    this.selectedCategory.next(categoryName);
  }

  getSelectedCategory() {
    return this.selectedCategory;
  }

  // setSelectedTask(task:)

  completedIconMouseIn(event: any) {
    if (this.hasClass(event, "fa-regular fa-circle")) {
      event.target.className = "fa-regular fa-circle-check";
    }
  }

  completedIconMouseOut(event: any) {
    if (this.hasClass(event, "fa-regular fa-circle-check")) {
      event.target.className = "fa-regular fa-circle";
    }
  }

  importantStatus(event: any, task: Task) {
    if (this.hasClass(event, "fa-regular fa-star")) {
      task.isImportant = true;
      task.category.push("Important");
    } else {
      task.isImportant = false;
      let index = task.category.indexOf('Important');
      task.category.splice(index, 1);
    }
  }

  changeCompletedStatus(task: Task) {
    if(task.isCompleted == true) {
      task.isCompleted=false;
    } else {
      task.isCompleted=true;
    }
  }

  hasClass(event: any, className: string) {
    return event.target.className === className;
  }
}
