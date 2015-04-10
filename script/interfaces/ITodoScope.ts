/// <reference path='../_all.d.ts' />

module todos {

	var TodoItem = require('exports?todos!../models/TodoItem').TodoItem;
	var TodoCtrl = require('exports?todos!../controllers/TodoCtrl').TodoCtrl;

	export interface ITodoScope extends ng.IScope {
		todos: TodoItem[];
		newTodo: string;
		editedTodo: TodoItem;
		remainingCount: number;
		doneCount: number;
		allChecked: boolean;
		statusFilter: { completed: boolean; };
		location: ng.ILocationService;
		vm: TodoCtrl;
	}
}
