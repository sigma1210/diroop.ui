(function(ng,app){
  'use strict';

app.config(['$stateProvider',config]);
function config($stateProvider){
  var HOME={
    name :'drHome',
    url:'/welcome',
    template:'<dr:welcome></dr:welcome>'
  };
  $stateProvider.state(HOME);

 var ABOUT={
   name:'drAbout',
   url:'/about',
   template:'<dr:about></dr:about>'
 };
 $stateProvider.state(ABOUT);

}


})(angular,angular.module('diroop.ui'));
