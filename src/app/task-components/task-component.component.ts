import { Component, OnInit } from "@angular/core";
import { Category } from "../category";

@Component({
  selector: "app-common-Component",
  templateUrl: "./task-component.component.html",
})

export class TaskMainComponent implements OnInit {

  public selectedCategoryName: string = "";

  public categoryList!: Category[];

  constructor() { }

  ngOnInit(): void { }

  getSelectedCategoryName(name: string): void {
    this.selectedCategoryName = name;
  }

  getCategoryList(categories: Category[]): void {
    this.categoryList = categories;
  }
}