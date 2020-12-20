// styles
import './styles.css';

// classes
import { Todo, TodoList } from './classes/'; 
import { crearTodoHtml } from './js/components.js';

// objeto
export const todoList = new TodoList();

// iterando el array para desplegar cada todo
todoList.todos.forEach( crearTodoHtml );



