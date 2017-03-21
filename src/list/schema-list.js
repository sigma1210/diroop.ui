(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-schema-list
   * @memberof diroop.ui

   * @requires drSchemaCache  -  Ask the Cache for all its schemas
   * @requires $log           -  The quick brown fox jumps over the lazy $log
   * @restrict E
   * @description
      Lists the cached schemas
   * @example
      <dr:schema:list on-schema-select="(schema)=>{}" ><dr:schema:list>
  **/
  directive('drSchemaList',['drSchemaCache','$log',drSchemaList]);
  function drSchemaList(schemaCache,$log){
    return{
      scope:{
        onSchemaSelect:'&'
      },
      link:_link,
      templateUrl:'drUiTemplateCache:/list/schema-list.html'
    };

    function _link(scope,element,attrs){
      scope.cachedSchemas = schemaCache.getUris();
      scope.selectSchema=function(uri){
        scope.onSchemaSelect({schema:uri});
      };


    }

  }
})(angular,angular.module('diroop.ui').directive);
