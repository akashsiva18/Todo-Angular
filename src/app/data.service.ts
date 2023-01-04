import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = "http://localhost:8080/todo/"

  constructor(private http: HttpClient) { 
  }

  getCategory():Observable<Object> {
    return this.http.get(this.baseUrl + "categories");
  }
}
