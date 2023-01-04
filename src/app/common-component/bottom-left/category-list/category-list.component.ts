import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { async } from '@angular/core/testing';
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
    //this.selectedCategory = "My Day"; 
    this.categories = this.commonService.getCategories();
    this.commonService.currentSelectedCategory$.subscribe(category => this.selectedCategory = category.name);;
  }

  onSelectCategory(category: Category): void {
    this.selectedCategory = category.name;
    this.commonService.setSelectedCategory(category);
  }
}
