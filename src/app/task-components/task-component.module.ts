import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskMainComponent } from './task-component.component';
import { FormsModule } from '@angular/forms';
import { FilterTaskPipe } from '../pipe/filter-task.pipe';
import { TaskComponent } from './task-component/task.component';
import { CategoryComponent } from './category-component/category.component';
import { TaskDetailsComponent } from './task-details-component/task-details.component';
import { CategoryListComponent } from './category-component/category-list/category-list.component';
import { TaskListComponent } from './task-component/task-list/task-list.component';

@NgModule({
  declarations: [
    TaskComponent,
    CategoryComponent,
    TaskDetailsComponent,
    CategoryListComponent,
    TaskMainComponent,
    TaskListComponent,
    FilterTaskPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TaskComponent,
    CategoryComponent,
    TaskDetailsComponent,
    TaskMainComponent
  ]
})
export class TaskMainComponentModule { }