/// <reference path='_all.d.ts' />

/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */

require('todomvc-app-css/index.css');
require('../node_modules/todomvc-common/base.css');
require("angular");

module todos {
    'use strict';

    var TodoCtrl = require('exports?todos!./controllers/TodoCtrl').TodoCtrl;
    var TodoBlur = require('exports?todos!./directives/TodoBlur').TodoBlur;
    var TodoFocus = require('exports?todos!./directives/TodoFocus').TodoFocus;
    var TodoStorage = require('exports?todos!./services/TodoStorage').TodoStorage;

    var todomvc = angular.module('todomvc', []);

    todomvc.service('todoStorage', ()=>{
      return new TodoStorage();
    });

    todomvc.controller('todoCtrl', (
			$scope: ITodoScope,
			$location: ng.ILocationService,
			todoStorage: ITodoStorage,
			$filter: ng.IFilterService
		)=>{
      return new TodoCtrl($scope,
        $location,
        todoStorage,
        $filter);
    });

    todomvc.directive('todoBlur', ()=>{
      return new TodoBlur();
    });

    todomvc.directive('todoFocus', ($timeout)=>{
      return new TodoFocus($timeout);
    })
}
