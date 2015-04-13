/// <reference path='_all.d.ts' />

/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */

require('todomvc-app-css/index.css');
require('../node_modules/todomvc-common/base.css');
require("angular");


import TodoCtrl = require('./controllers/TodoCtrl');
import TodoBlur = require('./directives/TodoBlur');
import TodoFocus = require('./directives/TodoFocus');
import TodoStorage = require('./services/TodoStorage');

    'use strict';

    var todomvc = angular.module('todomvc', []);

    todomvc.service('todoStorage', ()=>{
      return new TodoStorage();
    });

    todomvc.controller('todoCtrl', (
			$scope,
			$location,
			todoStorage,
			$filter
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
