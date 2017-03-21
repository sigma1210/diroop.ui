(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-compile
   *
   * @require $compile
   * @restrict A   *
   * @description
      a simple directive that compiles an angular template as the content of the
      element - when the values changes the template is recompiled
   * @example
      <div  dr-compile="string-value-to-compile-in-scope">
      </div>
  **/
  directive('drCompile',['$compile',drCompile]);
  /*
      its watches  the eval of  dr-compile attribute on the element
      sets it to the elements content if its changed and then
      runs $compile on the elements content in the current scope .
  */
  function drCompile($compile){
    return function(scope,element,attrs){
      function _watcher(scope){
        return scope.$eval(attrs.drCompile);
      }
      function _handler(value){
        element.html(value);
        $compile(element.contents())(scope);
      }
      scope.$watch(_watcher,_handler);
    };
  }
})(angular,angular.module('diroop.ui').directive);
