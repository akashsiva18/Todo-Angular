import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/category';
import { TaskService } from 'src/app/task.service';
import { DataService } from 'src/app/data.service';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-bottom-left',
  templateUrl: './bottom-left.component.html',
  styleUrls: ['./bottom-left.component.scss']
})

export class BottomLeftComponent implements OnInit {

  constructor(public TaskService: TaskService,public dataService:DataService) { }
  @ViewChild(CategoryListComponent) child !: CategoryListComponent;
  public selectedCategory?: String;
  public categoryName: string = "";
  public addedCategory!:Category;

  ngOnInit(): void {
  }

  addCategory() {
    this.child.addCategory(this.categoryName);
    this.categoryName = "";
  }

  toggleMenuAction() {
    this.TaskService.toggleMenuAction();
  }
}
