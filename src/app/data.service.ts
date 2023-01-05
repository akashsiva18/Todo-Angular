import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "http://localhost:8080/todo/"

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getCategory(): Observable<Object> {
    return this.http.get(this.baseUrl + "categories");
  }

  addCategory(category: Category) {
    return this.http.post(this.baseUrl + "category", JSON.stringify(category), this.httpOptions)
  }

  addTask(task:Task) {
    return this.http.post(this.baseUrl + "task",JSON.stringify(task),this.httpOptions);
  }

  getTasks() {
    return this.http.get(this.baseUrl + "tasks");
  }

}
