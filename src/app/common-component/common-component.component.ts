import { Component, OnInit } from "@angular/core";
import { Category } from "../category";
import { Task } from "../task";

@Component({
  selector: "app-common-Component",
  templateUrl: "./common-component.component.html",
})

export class CommonComponent implements OnInit {

  public selectedCategoryName: string = "";

  public categoryList!: Category[];

  public selectedTask!: Task;

  constructor() { }

  ngOnInit(): void { }

  getSelectedCategoryName(name: string) {
    this.selectedCategoryName = name;
  }

  getCategoryList(categories: Category[]) {
    this.categoryList = categories;
  }

  getSelectedTask(task:Task) {
    this.selectedTask = task;
  }


}