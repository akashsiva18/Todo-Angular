import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomCenterComponent } from './bottom-center/bottom-center.component';
import { BottomLeftComponent } from './bottom-left/bottom-left.component';
import { BottomRightComponent } from './bottom-right/bottom-right.component';
import { CategoryListComponent } from './bottom-left/category-list/category-list.component';

@NgModule({
  declarations: [
    BottomCenterComponent,
    BottomLeftComponent,
    BottomRightComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BottomCenterComponent,
    BottomLeftComponent,
    BottomRightComponent
  ]
})
export class CommonComponentModule { }
