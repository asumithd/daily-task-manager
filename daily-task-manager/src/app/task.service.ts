import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();
  private apiUrl = 'http://localhost:3000/api/tasks';
  private tasks: any[] = [];

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  addTask(task: any): void {
    this.http.post(this.apiUrl, task).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
  }
  getTask() {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTask(updatedTask: any): void {
    this.http.put(this.apiUrl + '/' + updatedTask._id, updatedTask).subscribe(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      }
    );
  }

  deleteTask(id: string): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url).subscribe(
      () => {},
      (error) => {
        console.error('Delete task failed', error);
      }
    );
  }
}
