import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(private taskService:TaskService){}

  setSearchTask(input:string) {
    this.taskService.filter = input; //event.target.value;
    //console.log(event.target.value);
    console.log(input);
  }

}
