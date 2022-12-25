import { Component, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-common-Component",
  templateUrl: "./common-component.component.html",
})

export class CommonComponent implements OnInit {

  public selectedCategoryName?:string;

  constructor() {}

  ngOnInit(): void {}

  getSelectedCategoryName(name:string) {
    this.selectedCategoryName = name;
  }
  
}