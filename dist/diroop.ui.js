
(function(ng){
  'use strict';
  /**
      *@ngdoc overview
      *@name diroop.ui
      *@description
        reusable ui widgets
   **/
  ng.module('diroop.ui',['diroop.ui.templateCache','diroop.tools','ui.ace','ui.bootstrap','ui.keypress','ui.router','ui.tree']);
})(angular);

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

(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-json-viewer
   * @memberof diroop.ui
   * @requires $log                - can't live without $log
   * @requires $filter             - provide access to json filter
   * @restrict E
   * @description
      A componet to display an object as a formated JSON string
   *@scope
      entity '=?'
      allowEval
      parseError
      onEntityParse
   * @example
      <dr:json:viewer entity="theObjectToBeDisplayed" />
  **/

  component('drJsonViewer',{
    templateUrl:'drUiTemplateCache:/json/json-viewer.html',
    bindings:{
      entity:'=?',
      allowEval:'=?',
      parseError:'=?',
      onEntityParse:'&'
    },
    controller:['$scope','$log','$filter',function($scope,$log,$filter){
        var jsonify = $filter('json'),
            _self = this;

        _self.jsonData = jsonify($scope.entity);

        _self.aceLoaded = function(_editor){
          _self.aceEditor = _editor;
          _editor.$blockScrolling = Infinity;
        };

       _self.parseEntity = function(){
        _self.parseError= null;
        if(!_self.allowEval)return;
        try{
          var _entity = $scope.$eval(_self.jsonData);
          _self.entity = _entity;
          _self.onEntityParse({
            entity:_self.entity
          });
        }catch(e){
          _self.parseError= {
            message:"error parsing json",
            error:e
          };
        }
      };

      $scope.$watch('$ctrl.entity',function(){
         _self.jsonData = jsonify(_self.entity);
      });
    }]});

})(angular,angular.module('diroop.ui').component);

(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-schema-list
   * @memberof diroop.ui

   * @requires $log           -  The quick brown fox jumps over the lazy $log
   * @requires drSchemaCache  -  Ask the Cache for all its schemas
   * @restrict E
   * @description
      Lists the cached schemas
   * @example
      <dr:schema:list on-schema-select="(schema)=>{}" ><dr:schema:list>
  **/
  component('drSchemaList',{
    templateUrl:'drUiTemplateCache:/list/schema-list.html',
    bindings:{
      onSchemaSelect:'&'
    },
    controller:['$scope','$log','drSchemaCache',function($scope, $log,schemaCache){
        var _self = this;
        _self.dataBoolean= [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          }
        ]
      }, {
        'id': 2,
        'title': 'node2',
        'nodes': []
      }];

      _self.dataNumber = [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          }
        ]
        }, {
        'id': 2,
        'title': 'node2',
        'nodes': []
        }];
        _self.cachedSchemas = schemaCache.getUris();
        _self.treeDef=[];
        ng.forEach(_self.cachedSchemas,function(schema){
          _self.treeDef.push({
            path:schema,
            subschemas:[]
          });
        });
        _self.selectSchema=function(uri){
          _self.onSchemaSelect({
            schema:uri
          });
        };

        _self.remove = function (scope) {
          scope.remove();
        };
        _self.toggle = function (scope) {
          scope.toggle();
        };

        _self.moveLastToTheBeginning = function () {
          var a = $scope.data.pop();
          $scope.data.splice(0, 0, a);
        };

        _self.newSubItem = function (scope) {
          var nodeData = scope.$modelValue;
          nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
          });
        };

        _self.collapseAll = function () {
          $scope.$broadcast('angular-ui-tree:collapse-all');
        };

        _self.expandAll = function () {
          $scope.$broadcast('angular-ui-tree:expand-all');
        };


    }]});


})(angular,angular.module('diroop.ui').component);

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

(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-nav-bar
   * @memberof diroop.ui
   * @description
        defines the standard menu
   * @example
      <dr:nav:bar></dr:nav:bar>
  **/
  component('drNavBar',{
    templateUrl:'drUiTemplateCache:/nav/navBar.html'
  });
})(angular,angular.module('diroop.ui').component);

(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-side-nav
   * @memberof diroop.ui
   * @description
        defines the side menu menu
   * @example
      <dr:side:nav></dr:side:nav>
  **/
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
  component('drSchemaPathLoader',{
      templateUrl:'drUiTemplateCache:/paths/schema-path-loader.html',
      bindings:{
        onSchemaSelect:'&',
        path:'=?'
      },
      controller:['$log','$timeout','drSchemaListService', function($log,$timeout,schemaList){
        var DEFAULT_PATH = "schemaCache:/address/address.schema.json",
            _self = this;
        _self.path = _self.path||DEFAULT_PATH;

        _self.selectSchema = function(){
          _self.onSchemaSelect({
            ref:_self.path
          });
        };

        _self.pickSchema=function(){
           $timeout(function () {
               _self.selectSchema();
           },0);
         };

        _self.search=function(text){
           return schemaList.search(text);
         };
      }]
  });

})(angular,angular.module('diroop.ui').component);

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

(function(ng,component){
  'use strict';
  /**
   * @ngdoc component
   * @name dr-schema-viewer
   * @memberof diroop.ui
   * @description
        a component used to search, load and resolve schemas
   * @example
      <dr:schema:viewer></dr:schema:viewer>
  **/
  component('drSchemaViewer',{
    templateUrl:'drUiTemplateCache:/viewer/schema-viewer.html',
    bindings:{
      path:'=?',
      rawSchema:'=?',
      schema:'=?',
      sampleModel:'=?'
    },
    controller:['$log','drSchemaLoader','drMockJsonService',function($log,schemaLoader,jsonFaker){
      var _self = this;
      _self.sampleModel = _self.sampleModel||{};
      _self.path = _self.path||"schemaCache:/address/address.schema.json";

      _self.selectSchema = function(ref){
        _loadAll(ref);
      };

      _loadAll(_self.path);

      function _loadAll(ref){
        _self.path = ref;
        _self.error= null;
         _loadSchema(_self.path)
          .then(_expandSchema)
          .then(_mockSchema);
       }
      function _loadSchema(_path){
        return schemaLoader
          .getSchemaSet(_path)
          .then(function(_set){
            _self.rawSchema=_set.schema;
            return _self.path;
          })
          .catch(_schemaSetError);
      }

      function _expandSchema(_path){
        return schemaLoader
          .getExpandedSchema(_path)
          .then(function(_expandedSchema){
            _self.schema=_expandedSchema;
            return _expandedSchema;
          })
          .catch(_schemaSetError);
      }

      function _mockSchema(_schema){
        return jsonFaker
          .getFake(_schema)
          .then(function(sample){
              _self.sampleModel =sample;
              return sample;
          })
          .catch(_schemaSetError);
      }

      function _schemaSetError(error){
        _self.error=error;
        _self.rawSchema= null;
        _self.schema= null;
        _self.sampleModel ={};
        $log.error(error);
      }


    }]
  });
})(angular,angular.module('diroop.ui').component);

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

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/about/about.html',
    '<div class="row"><div class="col-sm-3"><dr:side:nav></dr:side:nav></div><div class="col-sm-9"><h1>about diroop</h1><p class="lead">json schema templates in angular applications</p><p>diroop provides a collection of tools that can be used to package your json schemas</p><dr:schema:viewer></dr:schema:viewer><pre>https://ssatb-profileservice-dev-feature4.azurewebsites.net/swagger/docs/v1</pre><dr:schema:list></dr:schema:list></div></div>');
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
    '<div class="panel panel-default dr-json-view"><div class="panel-heading" ng-if="$ctrl.allowEval"><div class="input-group" ng-click="$ctrl.parseEntity()"><p class="form-control-static">Evaluate the Json==></p><span class="input-group-addon"><a href=""><span class="icon icon-cog" aria-hidden="true"></span></a></span></div></div><div class="panel-body"><div ui-ace="{useWrapMode : true, mode:\'json\', onLoad:$ctrl.aceLoaded }" ng-model="$ctrl.jsonData" ng-blur="$ctrl.parseEntity()"></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/list/node-renderer.html',
    '<div class="diroop-tree-node"><div ui-tree-handle="" class="tree-node tree-node-content"><a class="btn btn-default-outline btn-sm" ng-if="node.nodes && node.nodes.length > 0" data-nodrag="" ng-click="$ctrl.toggle(this)"><span class="icon" ng-class="{ \'icon-circle-with-plus\': collapsed, \'icon-circle-with-minus\': !collapsed }"></span></a> {{node.title}} <a class="pull-right btn btn-danger-outline btn-sm" data-nodrag="" ng-click="$ctrl.remove(this)"><span class="icon icon-circle-with-cross"></span></a> <a class="pull-right btn btn-info-outline btn-sm" data-nodrag="" ng-click="$ctrl.newSubItem(this)" style="margin-right: 8px;"><span class="icon icon-squared-plus"></span></a></div><ol ui-tree-nodes="" ng-model="node.nodes" ng-class="{hidden: collapsed}"><li ng-repeat="node in node.nodes" ui-tree-node="" data-collapsed="true" data-expand-on-hover="true" ng-include="\'drUiTemplateCache:/list/node-renderer.html\'"></li></ol></div>');
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
    '<div class="diroop-tree-view"><div class="row"><div class="col-sm-6"><div ui-tree="" id="tree-root-boolean"><ol ui-tree-nodes="" ng-model="$ctrl.dataBoolean"><li ng-repeat="node in $ctrl.dataBoolean" ui-tree-node="" data-collapsed="true" data-expand-on-hover="true" ng-include="\'drUiTemplateCache:/list/node-renderer.html\'"></li></ol></div></div><div class="col-sm-6"><div class="info">{{info}}</div><pre class="code">{{ $ctrl.dataBoolean | json }}</pre></div></div><div class="row"><div class="col-sm-12"><h3>Expand on Hover Example</h3></div></div><div class="row"><div class="col-sm-6"><div ui-tree="" id="tree-root-number"><ol ui-tree-nodes="" ng-model="$ctrl.dataNumber"><li ng-repeat="node in $ctrl.dataNumber" ui-tree-node="" data-collapsed="true" data-expand-on-hover="2500" ng-include="\'drUiTemplateCache:/list/node-renderer.html\'"></li></ol></div></div><div class="col-sm-6"><div class="info">{{info}}</div><pre class="code">{{ $ctrl.dataNumber | json }}</pre></div></div></div>');
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
    '<nav class="sidebar-nav"><div class="collapse nav-toggleable-sm"><ul class="nav nav-pills nav-stacked"><li ui-sref-active="active"><a ui-sref="drHome">welcome</a></li><li ui-sref-active="active"><a ui-sref="drAbout">about</a></li></ul><hr class="visible-xs m-t"></div></nav>');
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
    '<div class="input-group" ui-keypress="{enter: \'$ctrl.pickSchema()\'}"><span class="input-group-addon"><span class="icon icon-credit" aria-hidden="true">ref:</span></span> <input type="text" class="form-control" placeholder="schema Url" uib-typeahead="schema.label for schema in $ctrl.search($viewValue)" typeahead-on-select="$ctrl.pickSchema()" ng-model="$ctrl.path"> <span class="input-group-btn"><button class="btn btn-primary" ng-click="$ctrl.selectSchema()" type="button"><span class="icon icon-share" aria-hidden="true"></span></button></span></div>');
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
    '<div><dl class="dl-horizontal"><dt>diroop.ui :</dt><dd><small>{{$ctrl.version}}</small></dd></dl><dr:version></dr:version></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/tabs/tab.html',
    '<li ng-class="[{active: active, disabled: disabled}, classes]" role="presentation"><a href="" ng-click="select($event)" class="nav-link" uib-tab-heading-transclude="">{{heading}}</a></li>');
}]);
})();

(function(module) {
try {
  module = angular.module('diroop.ui.templateCache');
} catch (e) {
  module = angular.module('diroop.ui.templateCache', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('drUiTemplateCache:/tabs/tabset.html',
    '<div><div class="hr-divider m-y-md"><ul class="nav nav-pills hr-divider-content hr-divider-nav" ng-transclude=""></ul></div><div class="tab-content"><div class="tab-pane" ng-repeat="tab in tabset.tabs" ng-class="{active: tabset.active === tab.index}" uib-tab-content-transclude="tab"></div></div></div>');
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
    '<div><dr:schema:path:loader path="$ctrl.path" on-schema-select="$ctrl.selectSchema(ref)"></dr:schema:path:loader><uib-tabset active="active" template-url="drUiTemplateCache:/tabs/tabset.html"><uib-tab index="0" template-url="drUiTemplateCache:/tabs/tab.html"><uib-tab-heading><span class="icon icon-flow-line"></span> raw</uib-tab-heading><dr:json:viewer entity="$ctrl.rawSchema"></dr:json:viewer></uib-tab><uib-tab index="1" template-url="drUiTemplateCache:/tabs/tab.html"><uib-tab-heading><span class="icon icon-flow-tree"></span> expanded</uib-tab-heading><dr:json:viewer entity="$ctrl.schema"></dr:json:viewer></uib-tab><uib-tab index="2" template-url="drUiTemplateCache:/tabs/tab.html"><uib-tab-heading><span class="icon icon-flow-cascade"></span> sample</uib-tab-heading><dr:json:viewer entity="$ctrl.sampleModel"></dr:json:viewer></uib-tab><uib-tab index="3" ng-if="$ctrl.error" template-url="drUiTemplateCache:/tabs/tab.html"><uib-tab-heading><span class="icon icon-bug"></span> errors</uib-tab-heading><div class="panel panel-danger"><div class="panel-body"><pre class="pre-scrollable">{{$ctrl.error|json}}</pre></div></div></uib-tab></uib-tabset></div>');
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
