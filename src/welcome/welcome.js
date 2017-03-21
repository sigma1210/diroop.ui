(function(ng,component){
  /**
   * @ngdoc component
   * @name dr-welcome
   * @memberof diroop.ui
   * @description
        a components that wraps the welcome page
   * @example
      <dr:welcome></dr:welcome>
  **/
  component('drWelcome',{
    templateUrl:'drUiTemplateCache:/welcome/welcome.html'
  });
})(angular,angular.module('diroop.ui').component);
