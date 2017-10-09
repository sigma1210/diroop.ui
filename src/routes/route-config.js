(function(ng,app){
  'use strict';

app.config(['$stateProvider','$urlRouterProvider', config]);
function config($stateProvider,$urlRouterProvider){
  //defines the home route
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

 var VIEW={
   name:'drView',
   url:'/view',
   template:'<dr:view></dr:view>'
 };


 $stateProvider.state(VIEW);
//
  $urlRouterProvider.otherwise('/welcome')


}


})(angular,angular.module('diroop.ui'));
