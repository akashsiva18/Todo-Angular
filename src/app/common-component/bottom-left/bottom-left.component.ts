import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-bottom-left',
  templateUrl: './bottom-left.component.html',
  styleUrls: ['./bottom-left.component.scss']
})

export class BottomLeftComponent implements OnInit, DoCheck {

  constructor() { }
  public category?: Category;
  @Output() selectedCategoryName = new EventEmitter<string>();
  public selectedCategory?: String;
  @Output() categoryList = new EventEmitter<Category[]>();
  public categoryName = "";

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.categoryList.emit(this.categories);
  }

  public categories: Category[] = [
    { id: 1, name: "My Day", iconClass: "fa-solid fa-sun", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 2, name: "Important", iconClass: "fa-regular fa-star", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 3, name: "planned", iconClass: "fa-regular fa-calendar", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 4, name: "Assigned to Me", iconClass: "fa-solid fa-user", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 5, name: "Tasks", iconClass: "fa-solid fa-house", count: 0, isLastDefaultCategory: true, isDefaultCategory: true }
  ]

  addCategory(event: any) {
    if (event.key == "Enter") {
      this.categoryName = event.target.value;
      let count = this.countExistCategory(this.categoryName);
      if (count > 0) {
        this.categoryName = this.categoryName + " (" + count + ")";
      }
      this.category = {
        id: this.categories.length,
        name: this.categoryName,
        iconClass: "fa-solid fa-list",
        isDefaultCategory: false,
        isLastDefaultCategory: false,
        count: 0
      }
      this.categories.push(this.category);
      this.selectedCategory = event.target.value;
      this.onSelected(event.target.value);
      event.target.value = "";
    }
  }

  countExistCategory(name: String) {
    var count = 0;
    this.categories.forEach(category => {
      if (category.name.split(" (", 1)[0] === name) {
        count++;
      }
    });
    return count;
  }

  onSelected(categoryTitle: string) {
    this.selectedCategoryName.emit(categoryTitle);
  }
}
