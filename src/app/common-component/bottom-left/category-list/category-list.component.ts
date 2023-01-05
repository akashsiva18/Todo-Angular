import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/common.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private commonService: CommonService, private dataService: DataService) { }

  public selectedCategory?: String;

  public categories: Category[] = [];


  ngOnInit(): void {
    this.selectedCategory = "My Day";
    this.getCategories(true);
  }

  getCategories(firstCall: boolean): void {
    this.dataService.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.commonService.categories = this.categories;
      if (!firstCall) {
        this.commonService.setSelectedCategory(this.categories[this.categories.length - 1]);
      }
      this.commonService.setCategories(this.categories);
    });
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category.name;
    this.commonService.setSelectedCategory(category);
  }

  addCategory(categoryName: string): void {
    if (categoryName.trim().length == 0) {
      categoryName = "Untitled list";
    }
    let count = this.countExistCategory(categoryName);
    if (count > 0) {
      categoryName = categoryName + " (" + count + ")";
    }
    let category = {
      id: 0,
      name: categoryName,
      iconClass: "fa-solid fa-list",
      isDefaultCategory: false,
      isLastDefaultCategory: false,
      count: 0
    }
    this.dataService.addCategory(category).subscribe(() => {
      this.selectedCategory = categoryName;
      this.commonService.setSelectedCategory(category);
      this.getCategories(false);
    });
    // this.commonService.firstCategory = this.categories[this.categories.length-1];
  }

  countExistCategory(name: String): number {
    var count = 0;
    this.categories.forEach(category => {
      if (category.name.split(" (", 1)[0] === name) {
        count++;
      }
    });
    return count;
  }

}
