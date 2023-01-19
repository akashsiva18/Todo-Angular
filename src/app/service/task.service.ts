import { Injectable } from '@angular/core';
import { Category } from '../category';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Task } from '../task';
import { Constant } from '../constant';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  public constant = new Constant;
  public filter: string = "";
  public filter$ = of(this.filter);
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

  /**
   * Subscribe to the observable returned by the retrieveTasks() function in the data service, and
   * then reverse the order of the tasks array and store it to the retrievedTasks BehaviorSubject.
   */
  retrieveTasks(): void {
    this.dataService.retrieveTasks().subscribe((tasks: any) => {
      this.retrievedTasks.next(tasks.reverse());
    })
  }

  /**
   * If a taskId is passed in, use that taskId to retrieve the task from the database. If no taskId is
   * passed in, use the currentTaskSelectedId to retrieve the task from the database
   * 
   * @param {number} [taskId] - the id of the task to be retrieved. If task Id not provided, the current task
   * id is used to retrieve
   */
  setSelectedTask(taskId?: number): void {
    if (taskId === undefined) {
      taskId = this.currentTaskSelectedId;
    }
    this.dataService.retrieveTaskById(taskId).subscribe((task: any) => {
      this.selectedTask.next(task);
      this.currentTaskSelectedId = task.id;
    })
  }

  /**
   * Takes a category as an argument, and then sets the selectedCategory property to that category
   * 
   * @param {Category} category - Category - The category that selected.
   */
  setSelectedCategory(category: Category): void {
    this.selectedCategory.next(category);
  }

  /**
   * If the event target has the class COMPLETED_MOUSE_OUT, then change the class to
   * COMPLETED_MOUSE_IN.
   * 
   * @param {any} event - any - The event object that is passed to the function.
   */
  completedIconMouseIn(event: any): void {
    if (this.hasClass(event, this.constant.COMPLETED_MOUSE_OUT)) {
      event.target.className = this.constant.COMPLETED_MOUSE_IN;
    }
  }

  /**
   * If the event target has the class name of COMPLETED_MOUSE_IN, then change the class name to
   * COMPLETED_MOUSE_OUT.
   * 
   * @param {any} event - any - This is the event that is triggered when the mouse is over the icon.
   */
  completedIconMouseOut(event: any): void {
    if (this.hasClass(event, this.constant.COMPLETED_MOUSE_IN)) {
      event.target.className = this.constant.COMPLETED_MOUSE_OUT;
    }
  }

  /**
   * If the task is not important, make it important and add it to the important category. If it is
   * important, make it not important and remove it from the important category and send it to backend to save.
   * 
   * @param {Task} task - Task - this is the task that is being passed in from the HTML.
   */
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

  /**
   * If the task is completed, set it to false, otherwise set it to true.
   * 
   * @param {Task} task - Task - this is the task that is being passed in from the HTML.
   */
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

/**
 * Checks if the className of the event.target is equal to the className passed in as a parameter.
 * 
 * @param {any} event - any - this is the event that is triggered when the user clicks on the element.
 * @param {string} className - The class name to check for.
 * @return {boolean} - the className of the event.target.
 */
  hasClass(event: any, className: string): boolean {
    return event.target.className === className;
  }

  /**
   * If the left container is visible, hide it and apply the required class to the center container.
   * If the left container is hidden, show it and apply the required class to the center container
   */
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

  /**
   * Makes the right container view and check the left Container is visible or not and 
   * set the center container class accordingly to left container.
   */
  rightContainerView(): void {
    this.viewRightContainer = true;
    if (this.viewLeftContainer === true) {
      this.applyClassCenter = this.constant.CENTER_VIEW;
    } else {
      this.applyClassCenter = this.constant.LEFT_VIEW;
    }
  }

  /**
   * Makes the right container hide and check the left Container is visible or not and 
   * set the center container class accordingly to left container.
   */
  hideRightContainer(): void {
    this.viewRightContainer = false;
    if (this.viewLeftContainer === true) {
      this.applyClassCenter = this.constant.DEFAULT_VIEW;
    } else {
      this.applyClassCenter = this.constant.FULL_VIEW;
    }
  }
}
