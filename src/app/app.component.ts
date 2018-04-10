import { TodoService } from './services/todo.service';
import { Todo } from './interfaces/todo.interface';
import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.css' ]
})
export class AppComponent {
	name: string;
	todos: Todo[] = [];
	todosCompleted: Todo[] = [];
	todosActive: Todo[] = [];
	filter = 1;

	constructor(private todoService: TodoService) {
		this.getTodos();
		this.getTodosCompleted();
		this.getTodosActive();
	}
	/**
	 *Funcion para cargar todas las tareas
	 */

	getTodos() {
		this.todoService.getTodos().subscribe((content) => {
			this.todos = content;
		});
	}

	/**
	 * Funcion para cargar las tareas completadas
	 */
	getTodosCompleted() {
		this.todoService.getTodosCompleted().subscribe((content) => {
			this.todosCompleted = content;
		});
	}

	/**
	 * Funcion para cargar las tareas activas
	 */
	getTodosActive() {
		this.todoService.getTodosActive().subscribe((content) => {
			this.todosActive = content;
		});
	}

	/**
	 * Funcion para crear un tarea
	 * @param input, input que contiene el nombre de la tarea que se va a crear
	 */
	createToDo(input: HTMLInputElement) {
		this.todoService.createTodo(input);
	}

	/**
	 *Funcion para cambiar el estado de una tarea
	 * @param event, evento que ocurre cuando seleccionamos o deseleccionamos un checkbox
	 * @param todo, tarea a la cual se le esta cambiando el estado
	 */
	changeStatusTodo(event, todo: Todo) {
		this.todoService.chageStatusTodo(event, todo);
	}

	/**
	 * Funcion para eliminar una tarea
	 * @param todo, tarea que se va a eliminar
	 */
	removeTodo(todo: Todo) {
		this.todoService.removeTodo(todo);
	}

	/**
	 * Funcion para filtrar las tareas mostradas
	 * @param filter, valor numerico que indica por que parametro se van a filtrar las tareas
	 */
	show(filter: number) {
		this.filter = filter;
	}

	/**
	 * Funcion para eliminar las tareas completadas
	 */
	removeTodosCompleted() {
		this.todoService.removeTodosCompleted(this.todosCompleted);
	}
}
