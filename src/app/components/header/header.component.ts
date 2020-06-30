import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/services/todo-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() emitDeleteAll = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  deleteAll() {
    this.emitDeleteAll.emit();
  }
  login(name: string, pass: string) {
    this.todoService.login(name, pass);
  }
  register(name: string, pass: string) {
    this.todoService.register(name, pass);
  }
}
