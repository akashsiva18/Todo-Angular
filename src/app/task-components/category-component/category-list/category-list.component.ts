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

  /**
   * Subscribe to the currentSelectedCategory$ observable in the taskService and set the
   * selectedCategory variable to the name of the category that is passed in and 
   * retrieve the categories form the database. 
   */
  ngOnInit(): void {
    this.taskService.currentSelectedCategory$.subscribe((category) => {
      this.selectedCategory = category.name;
    })
    this.getCategories(true);
  }

  /**
   * Retrieves the categories from the database and sets the categories to the categories
   * retrieved from the database.
   * 
   * @param {boolean} firstCall - boolean - this is a boolean that is passed in to check if this is
   * the first time the categories are being retrieved. If it is, then the last category in the list is
   * selected.
   */
  private getCategories(firstCall: boolean): void {
    this.dataService.retrieveCategories().subscribe((categories: any) => {
      this.categories = categories;
      this.taskService.categories = this.categories;
      if (!firstCall) {
        this.taskService.setSelectedCategory(this.categories[this.categories.length - 1]);
      }
      this.taskService.categories = this.categories;
    });
  }

  /**
   * When a user clicks on a category, the category is set as the selected category
   * 
   * @param {Category} category - Category - this is the category that was selected by the user.
   */
  public onSelectCategory(category: Category): void {
    this.taskService.setSelectedCategory(category);
  }

  /**
   * Adds a new category to the database, and then updates the list of categories in the UI
   * 
   * @param {string} categoryName - The name of the category to be added.
   */
  public addCategory(categoryName: string): void {
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

  /**
   * Takes a string as an argument and returns the number of times that string appears in the array
   * of categories
   * 
   * @param {String} name - The name of the category.
   * @return The number of categories that have the same name as the name passed in.
   */
  private countExistCategory(name: String): number {
    var count = 0;
    this.categories.forEach(category => {
      if (category.name.split(" (", 1)[0] === name) {
        count++;
      }
    });
    return count;
  }

}
