import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-center',
  templateUrl: "./bottom-center.component.html",
  styleUrls: ['./bottom-center.component.scss']
})
export class BottomCenterComponent implements OnInit {

  @Input() categoryTitle?:String;

  ngOnInit(): void {
    this.categoryTitle= "My Day"
  }

}
