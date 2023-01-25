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

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  /**
   * Get the Categories from the server and return them as an Observable.
   * 
   * @return Observable<Object>
   */
  public retrieveCategories(): Observable<Object> {
    return this.http.get(this.baseUrl + "categories");
  }

  /**
   * Takes a Category object as a parameter, converts it to JSON, and sends it to the server using
   * the HTTP POST method
   * 
   * @param {Category} category - Category - The category object that we want to add to the database.
   * @return Observable<Object>
   */
  public addCategory(category: Category): Observable<Object> {
    return this.http.post(this.baseUrl + "category", JSON.stringify(category), this.httpOptions)
  }

  /**
   * Takes a Task object as a parameter, converts it to JSON, and sends it to the server using the
   * HTTP POST method
   * 
   * @param {Task} task - The task object that we want to add to the database.
   * @return Observable<Object>
   */
  public addTask(task: Task): Observable<Object> {
    return this.http.post(this.baseUrl + "task", JSON.stringify(task), this.httpOptions);
  }

  /**
   * Get the tasks from the server and return them as an Observable.
   * 
   * @return Observable<Object>
   */
  public retrieveTasks(): Observable<Object> {
    return this.http.get(this.baseUrl + "tasks");
  }

  /**
   * retrieves a task by its id.
   * 
   * @param {number} id - number - The id of the task to be retrieved.
   * @return Observable<Object>
   */
  public retrieveTaskById(id: number): Observable<Object> {
    return this.http.get(this.baseUrl + "tasks\\" + id);
  }
}
