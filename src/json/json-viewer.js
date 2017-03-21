(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-json-viewer
   * @memberof diroop.ui
   * @requires $log                - can't live without $log
   * @requires $filter             - provide access to json filter
   * @restrict E
   * @description
      A componet to display an object as a formated JSON string
   *@scope
      entity '=?'
      allowEval
      parseError
      onEntityParse
   * @example
      <dr:json:viewer entity="theObjectToBeDisplayed" />
  **/

  component('drJsonViewer',{
    templateUrl:'drUiTemplateCache:/json/json-viewer.html',
    bindings:{
      entity:'=?',
      allowEval:'=?',
      parseError:'=?',
      onEntityParse:'&'
    },
    controller:['$scope','$log','$filter',function($scope,$log,$filter){
        var jsonify = $filter('json'),
            _self = this;

        _self.jsonData = jsonify($scope.entity);

        _self.aceLoaded = function(_editor){
          _self.aceEditor = _editor;
          _editor.$blockScrolling = Infinity;
        };

       _self.parseEntity = function(){
        _self.parseError= null;
        if(!_self.allowEval)return;
        try{
          var _entity = $scope.$eval(_self.jsonData);
          _self.entity = _entity;
          _self.onEntityParse({
            entity:_self.entity
          });
        }catch(e){
          _self.parseError= {
            message:"error parsing json",
            error:e
          };
        }
      };

      $scope.$watch('$ctrl.entity',function(){
         _self.jsonData = jsonify(_self.entity);
      });
    }]});

})(angular,angular.module('diroop.ui').component);
