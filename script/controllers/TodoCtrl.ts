/// <reference path='../_all.d.ts' />

import ITodoScope = require('../interfaces/ITodoScope');
import ITodoStorage = require('../interfaces/ITodoStorage');
import TodoItem = require('../models/TodoItem');
import TodoStorage = require('../services/TodoStorage');

	'use strict';

	/**
	 * The main controller for the app. The controller:
	 * - retrieves and persists the model via the todoStorage service
	 * - exposes the model to the template and provides event handlers
	 */
	class TodoCtrl {
		public static MODULE_ID:string = 'todomvc.controllers.todo';
		public static SELECTOR:string = 'todoCtrl';

		private todos: TodoItem[];

		// $inject annotation.
		// It provides $injector with information about dependencies to be injected into constructor
		// it is better to have it close to the constructor, because the parameters must match in count and type.
		// See http://docs.angularjs.org/guide/di
		public static $inject = [
			'$scope',
			'$location',
			TodoStorage.SELECTOR,
			'$filter'
		];

		// dependencies are injected via AngularJS $injector
		constructor(
			private $scope: ITodoScope,
			private $location: ng.ILocationService,
			private todoStorage: ITodoStorage,
			private $filter: ng.IFilterService
		) {
			this.todos = $scope.todos = todoStorage.get();

			$scope.newTodo = '';
			$scope.editedTodo = null;

			// 'vm' stands for 'view model'. We're adding a reference to the controller to the scope
			// for its methods to be accessible from view / HTML
			$scope.vm = this;

			// watching for events/changes in scope, which are caused by view/user input
			// if you subscribe to scope or event with lifetime longer than this controller, make sure you unsubscribe.
			$scope.$watch('todos', () => this.onTodos(), true);
			$scope.$watch('location.path()', path => this.onPath(path))

			if ($location.path() === '') $location.path('/');
			$scope.location = $location;
		}

		onPath(path: string) {
			this.$scope.statusFilter = (path === '/active') ?
				{ completed: false } : (path === '/completed') ?
				{ completed: true } : null;
		}

		onTodos() {
			this.$scope.remainingCount = this.$filter('filter')(this.todos, { completed: false }).length;
			this.$scope.doneCount = this.todos.length - this.$scope.remainingCount;
			this.$scope.allChecked = !this.$scope.remainingCount
			this.todoStorage.put(this.todos);
		}

		addTodo() {
			var newTodo : string = this.$scope.newTodo.trim();
			if (!newTodo.length) {
				return;
			}

			this.todos.push(new TodoItem(newTodo, false));
			this.$scope.newTodo = '';
		}

		editTodo(todoItem: TodoItem) {
			this.$scope.editedTodo = todoItem;
		}

		doneEditing(todoItem: TodoItem) {
			this.$scope.editedTodo = null;
			todoItem.title = todoItem.title.trim();
			if (!todoItem.title) {
				this.removeTodo(todoItem);
			}
		}

		removeTodo(todoItem: TodoItem) {
			this.todos.splice(this.todos.indexOf(todoItem), 1);
		}

		clearDoneTodos() {
			this.$scope.todos = this.todos = this.todos.filter(todoItem => !todoItem.completed);
		}

		markAll(completed: boolean) {
			this.todos.forEach(todoItem => { todoItem.completed = completed; });
		}
	}

	angular.module(TodoCtrl.MODULE_ID, [
		require('../services/TodoStorage').MODULE_ID
		])
	.controller(TodoCtrl.SELECTOR, TodoCtrl);

export = TodoCtrl;
