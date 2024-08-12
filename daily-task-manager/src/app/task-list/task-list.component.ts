import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { TaskService } from '../task.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  task: any = {};
  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.getTask();
  }
  getTask() {
    this.taskService.getTask().subscribe((res) => {
      this.tasks = res;
    });
  }
  toggleTaskCompletion(task: any) {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
    this.getTask();
  }
  deleteTask(id: string): void {
    this.taskService.deleteTask(id);
    this.getTask();
  }
  addTask(): void {
    this.taskService.addTask(this.task);
    console.log(this.task, 'this.task');
    this.resetForm();
    this.getTask();
  }

  private resetForm(): void {
    this.task = {
      title: '',
      description: '',
      priority: 'Medium',
      dueDate: new Date(),
      reminder: new Date(),
      category: '',
      completed: false,
    };
  }
}
