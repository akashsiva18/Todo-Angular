import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/category';
import { TaskService } from 'src/app/service/task.service';
import { DataService } from 'src/app/service/data.service';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {

  constructor(public TaskService: TaskService, public dataService: DataService) { }
  @ViewChild(CategoryListComponent) child !: CategoryListComponent;
  public categoryName: string = "";
  public addedCategory!: Category;

  ngOnInit(): void {
  }

  /**
   * Add Category to the database by using the child method AddCategory. 
   */
  addCategory(): void {
    this.child.addCategory(this.categoryName);
    this.categoryName = "";
  }

  /**
   * Calls the toggleMenuAction function in the TaskService
   */
  toggleMenuAction(): void {
    this.TaskService.toggleMenuAction();
  }
}
