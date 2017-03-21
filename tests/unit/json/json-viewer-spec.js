describe('unit test : dr-json viewer',function(){
  var DIROOP_COMPILE_TEMPLATE='<dr:json:viewer entity="testModel" allow-eval="true"></dr:json:viewer>'
  var _rootScope,
      _compile,
      _componentController,
      _viewerCTRLInjections;

  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,$compile,$componentController,$log,$filter){
      _rootScope = $rootScope;
      _compile=$compile;
      _componentController=$componentController;
      _viewerCTRLInjections={
          $scope:_rootScope.$new(true),
          $log:$log,
          $filter:$filter
      };
  }));


  it('should compile without error',function(){
      var $scope= _rootScope.$new(true);
      $scope.testModel = {"test":"model"};
      var element = _compile(DIROOP_COMPILE_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('ui-ace');
      $scope.$destroy();
  });

  it('should have a controller',function(){
    var ctrl = _componentController('drJsonViewer',_viewerCTRLInjections);
    expect(ctrl).not.toBeUndefined();
  });


  it('should have a controller',function(){
    var _parseError= null,
        _entity = {"foo":"bar"};
        _bindings={
          entity:_entity,
          allowEval:true,
          parseError:_parseError,
          onEntityParse:function(params){
            expect(params).not.toBeUndefined();
          }
        },
        _ctrl = _componentController('drJsonViewer',_viewerCTRLInjections,_bindings);
    function testParse(){
        _ctrl.parseEntity();
    }

    expect(testParse).not.toThrow();

  });



});
