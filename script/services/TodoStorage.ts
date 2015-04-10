/// <reference path='../_all.d.ts' />

module todos {
    'use strict';

    var TodoItem = require('exports?todos!../models/TodoItem').TodoItem;

    /**
     * Services that persists and retrieves TODOs from localStorage.
     */
    export class TodoStorage implements ITodoStorage {

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
}
