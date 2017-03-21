describe('unit test : dr-schema-path-loader',function(){
  var DIROOP_COMPILE_TEMPLATE='<dr:schema:path:loader/>';
  var _rootScope,
      _componentController,
      _compile,
      _pathCTRLInjections;



  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,$compile,$componentController,$log,$timeout, drSchemaListService){
      _rootScope = $rootScope;
      _compile=$compile;
      _componentController=$componentController;
      _pathCTRLInjections={
        $log:$log,
        $timeout:$timeout,
        drSchemaListService:drSchemaListService
      };

  }));

  it('should compile without error',function(){
      var $scope= _rootScope.$new(true);
      var element = _compile(DIROOP_COMPILE_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('uib-typeahead');
      $scope.$destroy();
  });

  it('should have a controller',function(){
    var ctrl = _componentController('drSchemaPathLoader',_pathCTRLInjections);
    expect(ctrl).not.toBeUndefined();
  });


  it('should be able to pick a schema',function(){
    var ctrl = _componentController('drSchemaPathLoader',_pathCTRLInjections);
    function testPick(){
      ctrl.pickSchema();
      _rootScope.$apply();
    }
    expect(testPick).not.toThrow();
  });

  it('should be able to select a schema',function(){
    var ctrl = _componentController('drSchemaPathLoader',_pathCTRLInjections);
    // simulate bound function

    ctrl.onSchemaSelect= function(params){
        expect(params).not.toBeUndefined();
    }

    function testPick(){
      ctrl.selectSchema();
      _rootScope.$apply();
    }
    expect(testPick).not.toThrow();
  });


  it('should be able to search schemas without error',function(){
    var ctrl = _componentController('drSchemaPathLoader',_pathCTRLInjections);
    var _p;
    function testSearch(){
      _p = ctrl.search('geo');
      _rootScope.$apply();
    }
    expect(testSearch).not.toThrow();
    expect(_p).not.toBeUndefined();
  });



});
