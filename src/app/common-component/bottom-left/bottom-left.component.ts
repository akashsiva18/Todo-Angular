import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/category';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-bottom-left',
  templateUrl: './bottom-left.component.html',
  styleUrls: ['./bottom-left.component.scss']
})

export class BottomLeftComponent implements OnInit {

  constructor(public commonService: CommonService) { }
  public category?: Category;
  public selectedCategory?: String;
  public categoryName: string = "";

  ngOnInit(): void {
  }

  public categories: Category[] = this.commonService.getCategories();

  addCategory(): void {
    if (this.categoryName.trim().length == 0) {
      this.categoryName = "Untitled list";
    }
      let count = this.countExistCategory(this.categoryName);
      if (count > 0) {
        this.categoryName = this.categoryName + " (" + count + ")";
      }
      let category = {
        id: this.categories.length,
        name: this.categoryName,
        iconClass: "fa-solid fa-list",
        isDefaultCategory: false,
        isLastDefaultCategory: false,
        count: 0
      }
      this.commonService.addCategories(category);
      this.selectedCategory = this.categoryName;
      this.onSelected(category);
      this.categoryName = "";
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

  onSelected(category: Category) {
    this.commonService.setSelectedCategory(category);
  }

  toggleMenuAction() {
    this.commonService.toggleMenuAction();
  }
}
