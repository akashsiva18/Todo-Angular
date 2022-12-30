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

  constructor(private commonService: CommonService) { }
  public category?: Category;
  public selectedCategory?: String;

  ngOnInit(): void {
  }

  public categories: Category[] = this.commonService.getCategories();

  addCategory(event: any) {
    if (event.key == "Enter") {
      let categoryName = event.target.value;
      let count = this.countExistCategory(categoryName);
      if (count > 0) {
        categoryName = categoryName + " (" + count + ")";
      }
      let category = {
        id: this.categories.length,
        name: categoryName,
        iconClass: "fa-solid fa-list",
        isDefaultCategory: false,
        isLastDefaultCategory: false,
        count: 0
      }
      this.commonService.addCategories(category);
      this.selectedCategory = event.target.value;
      this.onSelected(event.target.value);
      event.target.value = "";
    }
  }

  countExistCategory(name: String) {
    var count = 0;
    this.categories.forEach(category => {
      if (category.name.split(" (", 1)[0] === name) {
        count++;
      }
    });
    return count;
  }

  onSelected(categoryTitle: string) {
    this.commonService.setSelectedCategory(categoryTitle);
    //this.selectedCategoryName.emit(categoryTitle);
  }
}
