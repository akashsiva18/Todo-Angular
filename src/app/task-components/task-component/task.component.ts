import { Component, DoCheck, OnInit } from '@angular/core';
import { Task } from 'src/app/task';
import { Category } from 'src/app/category';
import { TaskService } from 'src/app/service/task.service';
import { Constant } from 'src/app/constant';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-task',
  templateUrl: "./task.component.html",
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, DoCheck {

  public selectedCategory!: Category;
  public categoryTitle = "";
  public categoryList: Category[] = this.taskService.categories;
  public taskName: string = "";
  public tasks: Task[] = [];
  public pendingTasks: Task[] = [];
  public completedTasks: Task[] = [];
  public isImportantTask = false;
  public hideCompletedTask = true;
  public currentDate = new Date();
  public constant = new Constant();

  constructor(public taskService: TaskService, public dataService: DataService) { }

  /**
   * Subscribe to the currentSelectedCategory$ observable in the taskService, and when it emits a
   * new value, we set the categoryTitle to the name of the category, and the selectedCategory to the
   * category itself and retrieve task from taskService and subscribe the retrieved task observable.
   */
  ngOnInit(): void {
    this.taskService.currentSelectedCategory$.subscribe(category => {
      this.categoryTitle = category.name;
      this.selectedCategory = category;
    });
    this.taskService.retrieveTasks();
    this.taskService.retrievedTasks$.subscribe(tasks => this.tasks = tasks);
  }

  /**
   * The ngDoCheck function is called whenever the component is checked for changes.
   */
  ngDoCheck(): void {
    this.renderPendingTask();
    this.renderCompletedTask();
  }

  /**
   * Add a task to the database.
   */
  public addTask(): void {
    this.categoryList = this.taskService.categories;
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
        id: 0,
        categoryIds: categoryIds,
        name: this.taskName,
        note: "",
        isImportant: this.isImportantTask,
        isCompleted: false
      }
      this.dataService.addTask(task).subscribe(() => {
        this.taskService.retrieveTasks();
      })
      this.taskName = "";
    }
  }

  /**
   * Checks if the category is a default category or not
   * 
   * @param {number} id - The id of the category
   * @return {boolean}
   */
  public isDefaultTask(id: number): boolean {
    let noOfDefaultCategory = 5;
    for (let i = 0; i < noOfDefaultCategory; i++) {
      if (this.categoryList[i].id === id) {
        return true;
      }
    }
    return false;
  }

  /**
   * Render the pending task by using Task list and check the task status if is not completed then add 
   * to the pending task List.
   */
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

  /**
   * Render the Completed task by using Task list and checks the category is Important or Planned if true
   * then it not generate any completed Task else check the task status if is completed then add 
   * to the completedTasks task List.
   */
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

  /**
   * If the hideCompletedTask variable is true, set it to false. If it's false, set it to true
   */
  public showAndHideCompletedTask(): void {
    if (this.hideCompletedTask == true) {
      this.hideCompletedTask = false;
    } else {
      this.hideCompletedTask = true;
    }
  }

  /**
   * It calls the toggleMenuAction function in the taskService.ts file
   */
  public toggleMenuAction(): void {
    if (this.taskService.viewLeftContainer == false) {
      this.taskService.toggleMenuAction();
    }
  }
}
