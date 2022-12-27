import { AfterViewInit, Component, OnInit, Output, QueryList, ViewChildren } from "@angular/core";
import { BottomLeftComponent } from "./bottom-left/bottom-left.component";
import { BottomCenterComponent } from "./bottom-center/bottom-center.component";

@Component({
  selector: "app-common-Component",
  templateUrl: "./common-component.component.html",
})

export class CommonComponent implements OnInit {

  public selectedCategoryName?: string;

  @ViewChildren(BottomCenterComponent)
  bottomCenterComponent!: QueryList<BottomCenterComponent>;

  constructor() { }

  ngOnInit(): void { }

  getSelectedCategoryName(name: string) {
    this.selectedCategoryName = name;
    this.bottomCenterComponent.forEach(method => {
      method.taskListComponent.forEach(element=> {
        element.renderPendingTask();
        console.log("grandParent");
      })
    })
  }

}