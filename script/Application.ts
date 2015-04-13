/// <reference path='_all.d.ts' />

/**
 * The main TodoMVC app module.
 *
 * @type {angular.Module}
 */

require('todomvc-app-css/index.css');
require('../node_modules/todomvc-common/base.css');
require("angular");


    'use strict';

    var todomvc = angular.module('todomvc', [
      require('./directives/Dashboard').MODULE_ID
    ]);
