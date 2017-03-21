
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

  var _pathController = function($log,$timeout,schemaList){

    var DEFAULT_PATH = "schemaCache:/address/address.schema.json";

    var _self = this;
    _self.path = _self.path||DEFAULT_PATH;
    _self.selectSchema = function(){
      _self.onSchemaSelect({
        ref:_self.path
      });
     };

     _self.pickSchema=function($item, $model, $label, $event){
       $timeout(function () {
           _self.selectSchema();
       },100);
     };

     _self.onEnterKey=function(e){
       $timeout(function () {
           _self.selectSchema();
       },100);
     };
     _self.search=function(text){
       return schemaList.search(text);
     };
  };
  var ctrlDef =['$log','$timeout','drSchemaListService',_pathController];

  component('drSchemaPathLoader',{
      templateUrl:'drUiTemplateCache:/paths/schema-path-loader.html',
      controller:ctrlDef,
      bindings:{
        onSchemaSelect:'&',
        path:'=?'
      }
  });

})(angular,angular.module('diroop.ui').component);

/*

uib-typeahead="item.label for item in picker.search($viewValue)"
typeahead-on-select="picker.selectItem($item,item)"
*/
