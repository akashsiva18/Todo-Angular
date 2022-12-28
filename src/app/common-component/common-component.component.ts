import { Component, OnInit } from "@angular/core";
import { Category } from "../category";

@Component({
  selector: "app-common-Component",
  templateUrl: "./common-component.component.html",
})

export class CommonComponent implements OnInit {

  public selectedCategoryName?: string;

  public categoryList!:Category[];

  constructor() { }

  ngOnInit(): void { }

  getSelectedCategoryName(name: string) {
    this.selectedCategoryName = name; 
  }

  getCategoryList(categories: Category[]) {
    this.categoryList = categories;
  }
}