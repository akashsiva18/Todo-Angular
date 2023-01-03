import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private commonService: CommonService) { }

  @Input() public selectedCategory?: String;

  public categories: Category[] = this.commonService.getCategories();


  ngOnInit(): void {
    this.selectedCategory = "My Day";
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category.name;
    this.commonService.setSelectedCategory(category);
  }
}
