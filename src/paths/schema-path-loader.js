
(function(ng,component){
  'use strict';
  /**
   * @ngdoc componet
   * @name dr-schema-path-loader
   * @memberof diroop.ui
   * @requires $log                 - can't live without $log
   * @requires drSchemaListService
                  as schemaList    - to query available schemas
   * @description
      a component used to specifiy a schemas path and a button to load the schema
   * @example
      <dr:schema:path:loader schema="theSchma" on-schema-load="(schema)=>{}"/>
  **/
  component('drSchemaPathLoader',{
      templateUrl:'drUiTemplateCache:/paths/schema-path-loader.html',
      bindings:{
        onSchemaSelect:'&',
        path:'=?'
      },
      controller:['$log','$timeout','drSchemaListService', function($log,$timeout,schemaList){
        var DEFAULT_PATH = "schemaCache:/address/address.schema.json",
            _self = this;
        _self.path = _self.path||DEFAULT_PATH;

        _self.selectSchema = function(){
          _self.onSchemaSelect({
            ref:_self.path
          });
        };

        _self.pickSchema=function(){
           $timeout(function () {
               _self.selectSchema();
           },0);
         };

        _self.search=function(text){
           return schemaList.search(text);
         };
      }]
  });

})(angular,angular.module('diroop.ui').component);
