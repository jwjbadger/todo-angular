import { User } from './user.model';
import { Todo } from './todo-item.model';

export interface Project {
  _id: string;
  title: string;
  description: string;
  users: User[];
  todos: Todo[];
}
