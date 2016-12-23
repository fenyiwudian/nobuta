var App = angular.module('App', []);

App.directive('levelOne', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: `<div> 
            <span>levelOne</span>
            <level-two></level-two>
         </div>`,
        controller: function ($scope) {
            debugger;
        }
    }
}).directive('levelTwo', function () {
    return {
        restrict: 'E',
        replace: true,
        template: `<div> 
            <span>levelTwo</span>
            <level-three><level-three>
         </div>`,
        controller: function ($scope) {
            debugger;
        }
    }
}).directive('levelThree', function () {
    return {
        restrict: 'E',
        replace: true,
        template: `<div> 
            <span>levelThree</span>
         </div>`,
        controller: function ($scope) {
            debugger;
        }
    }
})