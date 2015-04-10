/// <reference path='../_all.d.ts' />

module todos {
	var TodoItem = require('exports?todos!../models/TodoItem').TodoItem;

	export interface ITodoStorage {
		get (): TodoItem[];
		put(todos: TodoItem[]);
	}
}
