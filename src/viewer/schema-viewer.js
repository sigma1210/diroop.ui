(function(ng,component){
  'use strict';
  var _schemaViewController=function(schemaLoader,jsonFaker){
    var _self = this;
    _self.sampleModel = {};
    _self.path = _self.path||"schemaCache:/address/address.schema.json";
    _self.selectSchema = function(ref){
      _self.loadSchema(ref);
    };
    _self.loadSchema = function(ref){
      _self.path = ref;
      schemaLoader
        .getSchemaSet(_self.path)
        .then(function(_set){
            _self.rawSchema=_set.schema;
            _self.error=null;
            schemaLoader
              .getExpandedSchema(_self.path)
              .then(function(_expandedSchema){
                  _self.schema=_expandedSchema;
                  _self.error=null;
                  jsonFaker
                    .getFake(_self.schema)
                    .then(function(sample){
                        _self.error=null;
                        _self.sampleModel =sample;
                    })
                    .catch(function(error){
                        _self.error=error;
                        _self.sampleModel ={};
                    });
              })
              .catch(function(error){
                _self.error=error;
                _self.schema= null;
                _self.sampleModel ={};
                $log.error(error);
              });
        }).catch(function(error){
          _self.error=error;
          _self.schema= null;
          _self.rawSchema= null;
          _self.sampleModel ={};
          $log.error(error);
        });
    };
    _self.loadSchema(_self.path);
  };
  component('drSchemaViewer',{
    templateUrl:'drUiTemplateCache:/viewer/schema-viewer.html',
    controller:['drSchemaLoader','drMockJsonService', _schemaViewController],
    bindings:{
      path:'=?',
      rawSchema:'=?',
      schema:'=?'
    }
  });
})(angular,angular.module('diroop.ui').component);
