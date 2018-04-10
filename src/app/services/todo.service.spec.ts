import { TestBed, inject } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('DbService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ TodoService ]
		});
	});

	it(
		'should be created',
		inject([ TodoService ], (service: TodoService) => {
			expect(service).toBeTruthy();
		})
	);
});
