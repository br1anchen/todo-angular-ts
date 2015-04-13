/// <reference path='../_all.d.ts' />

import TodoItem = require('../models/TodoItem');
import TodoCtrl = require('../controllers/TodoCtrl');

	interface ITodoScope extends ng.IScope {
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

	export = ITodoScope;
