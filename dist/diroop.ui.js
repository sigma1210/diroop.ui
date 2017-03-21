
(function(ng){
  'use strict';
  /**
      *@ngdoc overview
      *@name diroop.ui
      *@description
        reusable ui widgets
   **/
  ng.module('diroop.ui',['diroop.ui.templateCache','diroop.tools','ui.ace','ui.bootstrap','ui.keypress','ui.router']);
})(angular);

(function(ng,component){
    'use strict';

  //ctrlDef = ['$log','drSchemaLoader',aboutController];
  component('drAbout',{
    templateUrl:'drUiTemplateCache:/about/about.html',
  });
})(angular,angular.module('diroop.ui').component);

(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-compile
   *
   * @require $compile
   * @restrict A   *
   * @description
      a simple directive that compiles an angular template as the content of the
      element - when the values changes the template is recompiled
   * @example
      <div  dr-compile="string-value-to-compile-in-scope">
      </div>
  **/
  directive('drCompile',['$compile',drCompile]);
  /*
      its watches  the eval of  dr-compile attribute on the element
      sets it to the elements content if its changed and then
      runs $compile on the elements content in the current scope .
  */
  function drCompile($compile){
    return function(scope,element,attrs){
      function _watcher(scope){
        return scope.$eval(attrs.drCompile);
      }
      function _handler(value){
        element.html(value);
        $compile(element.contents())(scope);
      }
      scope.$watch(_watcher,_handler);
    };
  }
})(angular,angular.module('diroop.ui').directive);

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

(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-json-viewer
   * @memberof diroop.ui
   * @requires $log                - can't live without $log
   * @requires $filter             - provide access to json filter

   * @restrict E
   * @description
      A directive to display an object as a formated JSON string
   *@scope
      entity '=?'
      allowEval
      parseError
      onEntityParse
   * @example
      <dr:json:viewer entity="theObjectToBeDisplayed" />
  **/
  directive('drJsonViewer',['$log','$filter', drJsonViewer]);
  function drJsonViewer($log,$filter){
      var jsonify = $filter('json');
      //re-use json filter
      var viewController = function($scope){
        $scope.jsonData = jsonify($scope.entity);
        $scope.aceLoaded = function(_editor){
          $scope.aceEditor = _editor;
          _editor.$blockScrolling = Infinity;

        };
        $scope.aceChange = function(e){
          $log.debug('acechange');
          $log.debug(e);
        };
        $scope.$watch('entity',function(){
          $scope.jsonData = jsonify($scope.entity);
       });
       $scope.compileEntity = function(){
         $scope.parseError= null;
         if(!$scope.allowEval)return;
         try{
           var _entity = $scope.$eval($scope.jsonData);
           $scope.entity = _entity;
           $scope.onEntityParse({
             entity:$scope.entity
           });
         }catch(e){
           $scope.parseError= {
             message:"error parsing json",
             error:e
            };
         }
       };
     };
      return{
        controller:['$scope',viewController],
        scope:{
          entity:'=?',
          allowEval:'=?',
          parseError:'=?',
          onEntityParse:'&'
        },
        templateUrl:'drUiTemplateCache:/json/json-viewer.html',
      };
  }
})(angular,angular.module('diroop.tools').directive);

(function(ng,directive){
  'use strict';
  /**
   * @ngdoc directive
   * @name dr-schema-list
   * @memberof diroop.ui

   * @requires drSchemaCache  -  Ask the Cache for all its schemas
   * @requires $log           -  The quick brown fox jumps over the lazy $log
   * @restrict E
   * @description
      Lists the cached schemas
   * @example
      <dr:schema:list on-schema-select="(schema)=>{}" ><dr:schema:list>
  **/
  directive('drSchemaList',['drSchemaCache','$log',drSchemaList]);
  function drSchemaList(schemaCache,$log){
    return{
      scope:{
        onSchemaSelect:'&'
      },
      link:_link,
      templateUrl:'drUiTemplateCache:/list/schema-list.html'
    };

    function _link(scope,element,attrs){
      scope.cachedSchemas = schemaCache.getUris();
      scope.selectSchema=function(uri){
        scope.onSchemaSelect({schema:uri});
      };


    }

  }
})(angular,angular.module('diroop.ui').directive);

(function(ng,factory,faker){
  'use strict';
    /**
   * @ngdoc service
   * @name drMockJsonService
   * @memberof diroop.ui
   * @requires $q                 - always return a promise
   * @requires $log               - $log to $burn,
                                    $log to $burn,
                                    $log to save the $coal a $turn
   * @description
      provides method needed to create json that adhers to a specified schema.
      It also provides a common means to request jsf
   */
  factory('drMockJsonService',['$q','$log',_drMockJsonService]);
  function _drMockJsonService($q,$log){
    var JSON_FAKER_LIB_NOT_FOUND_EXCEPTION = '(JSON Schema Faker object -jsf) has not been found. '+
                                             'Include jsf lib https://github.com/json-schema-faker/json-schema-faker',
        HTTP_STATUS={
            CONTINUE: 100,
            SWITCHING_PROTOCOLS: 101,
            CONNECTION_TIMED_OUT: 110,
            CONNECTION_REFUSED: 111,
            OK: 200,
            CREATED: 201,
            ACCEPTED: 202,
            NON_AUTHORITATIVE_INFORMATION: 203,
            NO_CONTENT: 204,
            RESET_CONTENT: 205,
            PARTIAL_CONTENT: 206,
            BAD_REQUEST: 400,
            UNAUTHORIZED: 401,
            PAYMENT_REQUIRED: 402,
            FORBIDDEN: 403,
            NOT_FOUND: 404,
            METHOD_NOT_ALLOWED: 405,
            REQUEST_TIMEOUT: 408,
            INTERNAL_SERVER_ERROR: 500
        };

    var mockJsonService={
      getFaker:_getFaker,
      getFake:_getFake,
    };
    return  mockJsonService;
    /**
      * @ngdoc function
      * @name drMockJsonService.getFaker
      *
      * @description
      *  Use to get access to the jsf library which is injected from global
      *
      * @returns  a promise to resolve jsf if it exist or a rejection explaining
    */
    function _getFaker(){
      return $q(function(resolve,rejcet){
          if(!faker){
            reject({
              message:JSON_FAKER_LIB_NOT_FOUND_EXCEPTION
            });
          }else{
            resolve(faker);
          }
      });
    }
    /**
      * @ngdoc function
      * @name drMockJsonService.getFake
      *
      * @description
      *  uses a schema to supply a protype object which adhers to the schema
      *
      * @returns  a promise to resolve the mock or reject with an error
    */

    function _getFake(schema){
      return $q(function(resolve,reject){
        mockJsonService
          .getFaker()
          .then(function(_faker){
            resolve(_faker(schema));
          })
          .catch(function(error){
            reject(error);
          });
      });
    }
  }
})(angular,angular.module('diroop.ui').factory,jsf);

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


(function(ng,component){
  'use strict';
  /**
   * @ngdoc componet
   * @name dr-schema-path-loader
   * @memberof diroop.ui
   * @requires $log                 - can't live without $log
   * @requires drSchemaListService
                  as schemaList    - to query available schemas
   * @description
      a component used to specifiy a schemas path and a button to load the schema
   * @example
      <dr:schema:path:loader schema="theSchma" on-schema-load="(schema)=>{}"/>
  **/

  var _pathController = function($log,$timeout,schemaList){

    var DEFAULT_PATH = "schemaCache:/address/address.schema.json";

    var _self = this;
    _self.path = _self.path||DEFAULT_PATH;
    _self.selectSchema = function(){
      _self.onSchemaSelect({
        ref:_self.path
      });
     };

     _self.pickSchema=function($item, $model, $label, $event){
       $timeout(function () {
           _self.selectSchema();
       },100);
     };

     _self.onEnterKey=function(e){
       $timeout(function () {
           _self.selectSchema();
       },100);
     };
     _self.search=function(text){
       return schemaList.search(text);
     };
  };
  var ctrlDef =['$log','$timeout','drSchemaListService',_pathController];

  component('drSchemaPathLoader',{
      templateUrl:'drUiTemplateCache:/paths/schema-path-loader.html',
      controller:ctrlDef,
      bindings:{
        onSchemaSelect:'&',
        path:'=?'
      }
  });

})(angular,angular.module('diroop.ui').component);

/*

uib-typeahead="item.label for item in picker.search($viewValue)"
typeahead-on-select="picker.selectItem($item,item)"
*/

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

(function(ng,component){
  component('drWelcome',{
    templateUrl:'drUiTemplateCache:/welcome/welcome.html'
  });
})(angular,angular.module('diroop.ui').component);

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/about/about.html',
    '<div><h1>about diroop</h1><p class="lead">json schema templates in angular applications</p><p>diroop provides a collection of tools that can be used to package your json schemas</p><dr:schema:viewer></dr:schema:viewer></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/errors/errors.html',
    '<div class="panel panel-default"><div class="panel-heading">Validation Messages</div><div class="panel-body">{{exception.message}}</div><ul class="list-group"><li class="list-group-item" ng-repeat="error in exception.errors"><div class="panel panel-danger"><div class="panel-heading"><span class="badge">{{error.code}}</span> {{error.message}}</div><div class="panel-body"><dl class="dl-horizontal"><dt>params:</dt><dd>{{error.params}}</dd><dt>dataPath:</dt><dd>{{error.dataPath}}</dd><dt>schemaPath:</dt><dd>{{error.schemaPath}}</dd><dt>subError:</dt><dd><pre class="pre-scrollable" ng-if="error.subErrors">{{error.subError|json}}</pre></dd></dl></div></div></li></ul></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/json/json-viewer.html',
    '<div></div><div class="panel panel-default"><div class="panel-heading" ng-if="allowEval"><div class="input-group" ng-click="compileEntity()"><p class="form-control-static">Evaluate the Json==></p><span class="input-group-addon"><a href=""><span class="icon icon-cog" aria-hidden="true"></span></a></span></div></div><div class="panel-body"><div ui-ace="{ useWrapMode : true, mode:\'json\', onLoad:aceLoaded}" ng-model="jsonData" ng-blur="compileEntity()"></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/list/schema-list.html',
    '<div class="panel panel-default"><div class="panel-heading"><div class="input-group"><input type="text" class="form-control" ng-model="searchText"> <span class="input-group-addon"><span class="glyphicon glyphicon-filter" aria-hidden="true"></span></span></div></div><div class="panel-body"><div ng-repeat="schema in cachedSchemas | filter:searchText" class="dr-schema-list-item"><a href="" class="btn btn-link" ng-click="selectSchema(schema)"><span class="glyphicon glyphicon-link" aria-hidden="true"></span> {{schema}}</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/nav/navBar.html',
    '<nav class="navbar navbar-inverse navbar-fixed-top"><div class="container-fluid container-fluid-spacious"><div class="navbar-header"><a class="navbar-brand navbar-brand-emphasized" ui-sref="drHome"><span class="icon icon-share navbar-brand-icon"></span> diroop ui:</a></div><div class="collapse navbar-collapse"><ul class="nav navbar-nav"><li ui-sref-active="active"><a ui-sref="drHome">welcome</a></li><li ui-sref-active="active"><a ui-sref="drAbout">about</a></li></ul><div class="form-inline navbar-form navbar-right"><div class="input-with-icon"><input class="form-control" type="text" placeholder="Search..."> <span class="icon icon-magnifying-glass"></span></div></div></div></div></nav>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/nav/sideNav.html',
    '<nav class="sidebar-nav"><div class="sidebar-header"><a class="sidebar-brand img-responsive" ui-sref="drHome"><span class="icon icon-share"></span> diroop ui:</a></div><div class="collapse nav-toggleable-sm"><div class="sidebar-form"><input class="form-control" type="text" placeholder="Search..."> <button type="submit" class="btn-link"><span class="icon icon-magnifying-glass"></span></button></div><ul class="nav nav-pills nav-stacked"><li ui-sref-active="active"><a ui-sref="drHome">welcome</a></li><li ui-sref-active="active"><a ui-sref="drAbout">about</a></li></ul><hr class="visible-xs m-t"></div></nav>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/paths/schema-path-loader.html',
    '<div class="input-group" ui-keypress="{enter: \'$ctrl.onEnterKey($event)\'}"><span class="input-group-addon"><span class="icon icon-credit" aria-hidden="true">ref:</span></span> <input type="text" class="form-control" placeholder="schema Url" uib-typeahead="schema.label for schema in $ctrl.search($viewValue)" typeahead-on-select="$ctrl.pickSchema($item, $model, $label, $event)" ng-model="$ctrl.path"> <span class="input-group-btn"><button class="btn btn-primary" ng-click="$ctrl.loadSchema()" type="button"><span class="icon icon-share" aria-hidden="true"></span></button></span></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/version/version.html',
    '<div><dl class="dl-horizontal"><dt>diroop.ui :</dt><dd><small>{{version}}</small></dd></dl><dr:version></dr:version></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/viewer/schema-viewer.html',
    '<div><dr:schema:path:loader path="$ctrl.path" on-schema-select="$ctrl.selectSchema(ref)"></dr:schema:path:loader><uib-tabset active="active"><uib-tab index="0"><uib-tab-heading><span class="icon icon-flow-line"></span> raw</uib-tab-heading><dr:json:viewer entity="$ctrl.rawSchema"></dr:json:viewer></uib-tab><uib-tab index="1"><uib-tab-heading><span class="icon icon-flow-tree"></span> expanded</uib-tab-heading><dr:json:viewer entity="$ctrl.schema"></dr:json:viewer></uib-tab><uib-tab index="2"><uib-tab-heading><span class="icon icon-flow-cascade"></span> sample</uib-tab-heading><dr:json:viewer entity="$ctrl.sampleModel"></dr:json:viewer></uib-tab><uib-tab index="3" ng-if="$ctrl.error"><uib-tab-heading><span class="icon icon-bug"></span> errors</uib-tab-heading><div class="panel panel-danger"><div class="panel-body"><pre class="pre-scrollable">{{$ctrl.error|json}}</pre></div></div></uib-tab></uib-tabset></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/viewer/viewer.html',
    '<div class="hr-divider"><ul class="nav nav-pills hr-divider-content hr-divider-nav"><li class="active"><a href="#">Active tab</a></li><li><a href="#">Tab</a></li><li><a href="#">Tab</a></li></ul></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/welcome/welcome.html',
    '<div><h1>welcome to diroop</h1><p class="lead">tools to help manage your json schemas</p></div>');
}]);
})();
