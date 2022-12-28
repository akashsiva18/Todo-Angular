import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Category } from 'src/app/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  @Input() public selectedCategory?: String;

  @Input() categories?: Category[];
  
  @Output() onSelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.selectedCategory = "My Day";
  }

  onSelectCategory(category: Category) {
    this.selectedCategory = category.name;
    this.onSelected.emit(category.name);
  }
}
