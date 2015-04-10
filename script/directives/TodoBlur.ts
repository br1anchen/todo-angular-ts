/// <reference path='../_all.d.ts' />

module todos {
    'use strict';

    /**
     * Directive that executes an expression when the element it is applied to loses focus.
     */
    export function todoBlur(): ng.IDirective {
        return {
            link: ($scope: ng.IScope, element: JQuery, attributes: any) => {
                element.bind('blur', () => { $scope.$apply(attributes.todoBlur); });
            }
        };
    }
}
