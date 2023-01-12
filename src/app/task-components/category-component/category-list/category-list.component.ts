import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category';
import { TaskService } from 'src/app/service/task.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private taskService: TaskService, private dataService: DataService) { }

  public selectedCategory?: String;

  public categories: Category[] = [];


  ngOnInit(): void {
    this.taskService.currentSelectedCategory$.subscribe((category) => {
      this.selectedCategory = category.name;
    })
    this.getCategories(true);
  }

  getCategories(firstCall: boolean): void {
    this.dataService.getCategory().subscribe((res: any) => {
      this.categories = res;
      this.taskService.categories = this.categories;
      if (!firstCall) {
        this.taskService.setSelectedCategory(this.categories[this.categories.length - 1]);
      }
      this.taskService.setCategories(this.categories);
    });
  }

  onSelectCategory(category: Category): void {
    this.taskService.setSelectedCategory(category);
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
      this.taskService.setSelectedCategory(category);
      this.getCategories(false);
    });
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
