(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-schema-viewer
   * @memberof diroop.ui
   * @description
        a component used to search, load and resolve schemas
   * @example
      <dr:schema:viewer></dr:schema:viewer>
  **/
  component('drSchemaViewer',{
    templateUrl:'drUiTemplateCache:/viewer/schema-viewer.html',
    bindings:{
      path:'=?',
      rawSchema:'=?',
      schema:'=?',
      sampleModel:'=?'
    },
    controller:['$log','drSchemaLoader','drMockJsonService',function($log,schemaLoader,jsonFaker){
      var _self = this;
      _self.sampleModel = _self.sampleModel||{};
      _self.path = _self.path||"schemaCache:/address/address.schema.json";

      _self.selectSchema = function(ref){
        _loadAll(ref);
      };

      _loadAll(_self.path);

      function _loadAll(ref){
        _self.path = ref;
        _self.error= null;
         _loadSchema(_self.path)
          .then(_expandSchema)
          .then(_mockSchema);
       }
      function _loadSchema(_path){
        return schemaLoader
          .getSchemaSet(_path)
          .then(function(_set){
            _self.rawSchema=_set.schema;
            return _self.path;
          })
          .catch(_schemaSetError);
      }

      function _expandSchema(_path){
        return schemaLoader
          .getExpandedSchema(_path)
          .then(function(_expandedSchema){
            _self.schema=_expandedSchema;
            return _expandedSchema;
          })
          .catch(_schemaSetError);
      }

      function _mockSchema(_schema){
        return jsonFaker
          .getFake(_schema)
          .then(function(sample){
              _self.sampleModel =sample;
              return sample;
          })
          .catch(_schemaSetError);
      }

      function _schemaSetError(error){
        _self.error=error;
        _self.rawSchema= null;
        _self.schema= null;
        _self.sampleModel ={};
        $log.error(error);
      }


    }]
  });
})(angular,angular.module('diroop.ui').component);
