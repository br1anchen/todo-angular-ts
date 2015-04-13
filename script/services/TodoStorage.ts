/// <reference path='../_all.d.ts' />


  import TodoItem = require('../models/TodoItem');
  import ITodoStorage = require('../interfaces/ITodoStorage');

    'use strict';

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    class TodoStorage implements ITodoStorage {
  		public static MODULE_ID:string = 'todomvc.services.todoStorage';
  		public static SELECTOR:string = 'todoStorage';

        STORAGE_ID = 'todos-angularjs-typescript';

        constructor(){

        }

        get (): TodoItem[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(todos: TodoItem[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(todos));
        }
    }

    angular.module(TodoStorage.MODULE_ID, [

      ])
    .service(TodoStorage.SELECTOR, ()=>{
      return new TodoStorage();
    });

    export = TodoStorage;
