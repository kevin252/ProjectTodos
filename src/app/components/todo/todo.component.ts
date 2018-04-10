import { Filter } from './../../interfaces/filter.enum';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-todo',
	templateUrl: './todo.component.html',
	styleUrls: [ './todo.component.css' ]
})
export class TodoComponent implements OnInit {
	@Output() all = new EventEmitter();
	@Output() actived = new EventEmitter();
	@Output() completed = new EventEmitter();
	@Output() clearCompleted = new EventEmitter();
	@Input() lengthTodos;
	filter = Filter;
	constructor() {}
	showAll() {
		this.all.emit(this.filter.All);
	}
	showActived() {
		this.actived.emit(this.filter.Active);
	}

	showCompleted() {
		this.completed.emit(this.filter.Complete);
	}
	clear() {
		this.clearCompleted.emit();
	}
	ngOnInit() {}
}
