(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-ui-version
   * @memberof diroop.ui
   * @description
        a componet used to display the current version of diroop ui
   * @example
      <dr:ui:version></dr:ui:version>
  **/
  component('drUiVersion',{
    templateUrl:'drUiTemplateCache:/version/version.html',
    controller:[function(){
      var DIROOP_UI_VERSION ='v 1.0.0.0',
          _self = this;
      _self.version = DIROOP_UI_VERSION;
    }]
  });
})(angular,angular.module('diroop.ui').component);
