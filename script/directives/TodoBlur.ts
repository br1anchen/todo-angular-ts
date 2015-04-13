/// <reference path='../_all.d.ts' />

    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
     class TodoBlur implements ng.IDirective{
       public restrict:string;
       public link:($scope: ng.IScope, element: JQuery, attributes: any) => void;

       constructor() {
         this.restrict = 'A';
         this.link = ($scope: ng.IScope, element: JQuery, attributes: any) => {
             element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
         };

       }
     }


export = TodoBlur;
