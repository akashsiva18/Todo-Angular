import { Component } from '@angular/core';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  public categories: Category[] = [
    { id: 1, name: "My Day", iconClass: "fa-solid fa-sun", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 2, name: "Important", iconClass: "fa-regular fa-star", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 3, name: "planned", iconClass: "fa-regular fa-calendar", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 4, name: "Assigned to Me", iconClass: "fa-solid fa-user", count: 0, isLastDefaultCategory: false, isDefaultCategory: true },
    { id: 5, name: "Tasks", iconClass: "fa-solid fa-house", count: 0, isLastDefaultCategory: false, isDefaultCategory: true }
  ]

}
