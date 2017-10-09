(function(ng,component){
    'use strict';
    /**
     * @ngdoc component
     * @name dr-about
     * @memberof diroop.ui

     * @description
          a components that wraps the about page  
     * @example
        <dr:about></dr:about>
    **/
  component('drAbout',{
    templateUrl:'drUiTemplateCache:/about/about.html',
  });
})(angular,angular.module('diroop.ui').component);
