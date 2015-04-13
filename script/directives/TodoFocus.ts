/// <reference path='../_all.d.ts' />

	'use strict';

	/**
	 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true.
	 */
	class TodoFocus implements ng.IDirective{
		public restrict:string;
		public link:($scope: ng.IScope, element: JQuery, attributes: any) => void;

		public static MODULE_ID:string = 'todomvc.directives.todoFocus';
		public static SELECTOR:string = 'todoFocus';

    constructor($timeout: ng.ITimeoutService) {
			this.restrict = 'A';
      this.link = ($scope: ng.IScope, element: JQuery, attributes: any) => {
				$scope.$watch(attributes.todoFocus, newval => {
					if (newval) {
						$timeout(() => element[0].focus(), 0, false);
					}
				});
			};
    }
  }

	angular.module(TodoFocus.MODULE_ID, [

		])
	.directive(TodoFocus.SELECTOR, ($timeout)=>{
		return new TodoFocus($timeout);
	});

	export = TodoFocus;
