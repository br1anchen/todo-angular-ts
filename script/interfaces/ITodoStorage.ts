/// <reference path='../_all.d.ts' />

import TodoItem = require('../models/TodoItem');

	interface ITodoStorage {
		get (): TodoItem[];
		put(todos: TodoItem[]);
	}

	export = ITodoStorage;
