import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../category'; 
import { Task } from '../task';

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

  addCategory(category: Category) :Observable<Object>{
    return this.http.post(this.baseUrl + "category", JSON.stringify(category), this.httpOptions)
  }

  addTask(task: Task) :Observable<Object>{
    return this.http.post(this.baseUrl + "task", JSON.stringify(task), this.httpOptions);
  }

  getTasks() :Observable<Object> {
    return this.http.get(this.baseUrl + "tasks");
  }

  getTaskById(id: number):Observable<Object> {
    return this.http.get(this.baseUrl + "tasks\\" + id);
  } 

}
