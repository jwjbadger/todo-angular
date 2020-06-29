import { Todo } from './todo-item.model';

export interface User {
  [Symbol.iterator](): IterableIterator<string>;

  _id: string;
  name: string;
  password: string;
  todos: Todo[];
}
