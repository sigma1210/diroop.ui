(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-schema-list
   * @memberof diroop.ui

   * @requires $log           -  The quick brown fox jumps over the lazy $log
   * @requires drSchemaCache  -  Ask the Cache for all its schemas
   * @restrict E
   * @description
      Lists the cached schemas
   * @example
      <dr:schema:list on-schema-select="(schema)=>{}" ><dr:schema:list>
  **/
  component('drSchemaList',{
    templateUrl:'drUiTemplateCache:/list/schema-list.html',
    bindings:{
      onSchemaSelect:'&'
    },
    controller:['$scope','$log','drSchemaCache',function($scope, $log,schemaCache){
        var _self = this;
        _self.dataBoolean= [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          }
        ]
      }, {
        'id': 2,
        'title': 'node2',
        'nodes': []
      }];

      _self.dataNumber = [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          }
        ]
        }, {
        'id': 2,
        'title': 'node2',
        'nodes': []
        }];
        _self.cachedSchemas = schemaCache.getUris();
        _self.treeDef=[];
        ng.forEach(_self.cachedSchemas,function(schema){
          _self.treeDef.push({
            path:schema,
            subschemas:[]
          });
        });
        _self.selectSchema=function(uri){
          _self.onSchemaSelect({
            schema:uri
          });
        };

        _self.remove = function (scope) {
          scope.remove();
        };
        _self.toggle = function (scope) {
          scope.toggle();
        };

        _self.moveLastToTheBeginning = function () {
          var a = $scope.data.pop();
          $scope.data.splice(0, 0, a);
        };

        _self.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };

        _self.collapseAll = function () {
          $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        _self.expandAll = function () {
          $scope.$broadcast('angular-ui-tree:expand-all');
        };


    }]});


})(angular,angular.module('diroop.ui').component);
