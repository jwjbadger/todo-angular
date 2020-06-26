import { Todo } from './todo-item.model';

export class User {
  _id: string;
  name: string;
  todos: Todo[];
}
