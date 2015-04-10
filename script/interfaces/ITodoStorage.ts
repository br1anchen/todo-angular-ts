/// <reference path='../_all.d.ts' />

module todos {
	export interface ITodoStorage {
		get (): TodoItem[];
		put(todos: TodoItem[]);
	}
}
