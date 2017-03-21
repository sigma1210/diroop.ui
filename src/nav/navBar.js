// (function(ng,directive){
//   'use strict';
//   directive('drNavBar',['$log',drNavBar]);
//   function drNavBar($log){
//     return{
//       templateUrl:'drUiTemplateCache:/nav/navBar.html'
//     };
//   }
// })(angular,angular.module('diroop.ui').directive);

(function(ng,component){
  'use strict';
  component('drNavBar',{
    templateUrl:'drUiTemplateCache:/nav/navBar.html'
  });
})(angular,angular.module('diroop.ui').component);

(function(ng,component){
  'use strict';
  component('drSideNav',{
    templateUrl:'drUiTemplateCache:/nav/sideNav.html'
  });
})(angular,angular.module('diroop.ui').component);
