(function(ng,directive){
  'use strict';
  directive('drUiVersion',['$log',_drVersion]);
  function _drVersion(){
    //@todo get from config
    var DIROOP_UI_VERSION ='v 1.0.0.0';

    return {
      templateUrl:'drUiTemplateCache:/version/version.html',
      link :_link,
    };
    function _link(scope,elem,attrs){
      scope.version = DIROOP_UI_VERSION;
    }
  }

})(angular,angular.module('diroop.ui').directive);
