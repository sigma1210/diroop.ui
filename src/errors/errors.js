// (function(ng,directive){
//   'use strict';
//   directive('drSchemaError',['$log',drSchemaError]);
//   function drSchemaError($log){
//     return{
//       templateUrl:'drUiTemplateCache:/errors/errors.html',
//       scope:{
//         exception:'=?'
//       }
//     };
//   }
// })(angular,angular.module('diroop.ui').directive);

(function(ng,component){
  'use strict';
  component('drSchemaError',{
    templateUrl:'drUiTemplateCache:/errors/errors.html',
    scope:{
      exception:'=?'
    }
  });
})(angular,angular.module('diroop.ui').component);
