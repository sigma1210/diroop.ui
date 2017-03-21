(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-json-viewer
   * @memberof diroop.ui
   * @requires $log                - can't live without $log
   * @requires $filter             - provide access to json filter

   * @restrict E
   * @description
      A directive to display an object as a formated JSON string
   *@scope
      entity '=?'
      allowEval
      parseError
      onEntityParse
   * @example
      <dr:json:viewer entity="theObjectToBeDisplayed" />
  **/
  directive('drJsonViewer',['$log','$filter', drJsonViewer]);
  function drJsonViewer($log,$filter){
      var jsonify = $filter('json');
      //re-use json filter
      var viewController = function($scope){
        $scope.jsonData = jsonify($scope.entity);
        $scope.aceLoaded = function(_editor){
          $scope.aceEditor = _editor;
          _editor.$blockScrolling = Infinity;

        };
        $scope.aceChange = function(e){
          $log.debug('acechange');
          $log.debug(e);
        };
        $scope.$watch('entity',function(){
          $scope.jsonData = jsonify($scope.entity);
       });
       $scope.compileEntity = function(){
         $scope.parseError= null;
         if(!$scope.allowEval)return;
         try{
           var _entity = $scope.$eval($scope.jsonData);
           $scope.entity = _entity;
           $scope.onEntityParse({
             entity:$scope.entity
           });
         }catch(e){
           $scope.parseError= {
             message:"error parsing json",
             error:e
            };
         }
       };
     };
      return{
        controller:['$scope',viewController],
        scope:{
          entity:'=?',
          allowEval:'=?',
          parseError:'=?',
          onEntityParse:'&'
        },
        templateUrl:'drUiTemplateCache:/json/json-viewer.html',
      };
  }
})(angular,angular.module('diroop.tools').directive);
