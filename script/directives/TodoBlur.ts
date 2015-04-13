/// <reference path='../_all.d.ts' />

    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
     class TodoBlur implements ng.IDirective{
       public restrict:string;
       public link:($scope: ng.IScope, element: JQuery, attributes: any) => void;

       public static MODULE_ID:string = 'todomvc.directives.todoBlur';
       public static SELECTOR:string = 'todoBlur';

       constructor() {
         this.restrict = 'A';
         this.link = ($scope: ng.IScope, element: JQuery, attributes: any) => {
             element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
         };

       }
     }

     angular.module(TodoBlur.MODULE_ID, [
       ])
     .directive(TodoBlur.SELECTOR, ()=>{
       return new TodoBlur();
     });


export = TodoBlur;
