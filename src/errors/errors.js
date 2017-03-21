(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-schema-error
   * @memberof diroop.ui
   * @bindings
        {object} exception '=?' - the exception being displayed
   * @description
        display the erros frm schema validation in a common template
   * @example
        <dr:schema:error exception="theException"></dr:schema:error>
  **/
  component('drSchemaError',{
    templateUrl:'drUiTemplateCache:/errors/errors.html',
    scope:{
      exception:'=?'
    }
  });
})(angular,angular.module('diroop.ui').component);
