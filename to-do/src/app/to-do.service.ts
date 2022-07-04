import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToDoItem } from './to-do-item';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  private _BASE_URL: string = 'http://localhost:5200/.netlify/functions/server/todos';
  private _destroy$: Subject<void> = new Subject<void>();

  headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  constructor(private _httpClient: HttpClient) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getToDoById(id: string): Observable<ToDoItem> {
    return this._httpClient.get<ToDoItem>(`${this._BASE_URL}/${id}`);
  }

  createToDoItem(toDoItem: ToDoItem): Observable<string> {
    return this._httpClient.post(`${this._BASE_URL}`, toDoItem, {
      responseType: 'text',
    });
  }

  updateToDoItem(id: string, toDoItem: ToDoItem): Observable<string> {
    console.log(toDoItem);
    return this._httpClient.put(`${this._BASE_URL}/${id}`, toDoItem, {
      responseType: 'text',
    });
  }

  deleteToDoItem(id: string): Observable<string> {
    return this._httpClient.delete(`${this._BASE_URL}/${id}`, {
      responseType: 'text',
    });
  }

  getAllToDoItems(): Observable<ToDoItem[]> {
    return this._httpClient.get<ToDoItem[]>(`${this._BASE_URL}`);
  }
}
