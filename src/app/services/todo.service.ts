import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Todo } from '../interfaces/todo.interface';

@Injectable()
export class TodoService {
	constructor(private afs: AngularFirestore) {}
	/**
 * Funcion para cargar todas las tareas
 */
	getTodos() {
		return this.afs.collection<Todo>('todos').valueChanges();
	}

	/**
	 * Funcion para crear una tarea
	 * @param input, input que contiene el nombre de la tarea
	 */
	createTodo(input: HTMLInputElement) {
		const id = this.afs.createId();
		const name = input.value;
		const todo: Todo = {
			id,
			name,
			completed: false
		};
		this.afs.collection<Todo>('todos').doc(id).set(todo);
		input.value = '';
	}

	/**
	 *Funcion para cambiar el estado de una tarea
	 * @param event, evento que ocurre cuando seleccionamos o deseleccionamos un checkbox
	 * @param todo, tarea a la cual se le esta cambiando el estado
	 */
	chageStatusTodo(event, todo: Todo) {
		if (event.target.checked) {
			todo.completed = true;
		} else {
			todo.completed = false;
		}
		this.afs.collection<Todo>('todos').doc(todo.id).update(todo);
	}

	/**
	 * Funcion para eliminar una tarea
	 * @param todo, tarea que se va a eliminar
	 */
	removeTodo(todo: Todo) {
		this.afs.collection<Todo>('todos').doc(todo.id).delete();
	}

	/**
	 * Funcion para eliminar las tareas completadas
	 */
	removeTodosCompleted(todos: Todo[]) {
		todos.map((element) => {
			this.removeTodo(element);
		});
	}

	/**
	 * Funcion para cargar las tareas completadas
	 */
	getTodosCompleted() {
		return this.afs
			.collection<Todo>('todos', (ref) => ref.where('completed', '==', true))
			.valueChanges();
	}

	/**
	 * Funcion para cargar las tareas activas
	 */
	getTodosActive() {
		return this.afs
			.collection<Todo>('todos', (ref) => ref.where('completed', '==', false))
			.valueChanges();
	}
}
