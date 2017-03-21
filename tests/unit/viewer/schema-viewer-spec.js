describe('unit test : dr:schema:viewer',function(){
  var DIROOP_COMPILE_TEMPLATE='<dr:schema:viewer></dr:schema:viewer>'
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
      var element = _compile(DIROOP_COMPILE_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('dr:schema:path:loader');
      $scope.$destroy();
  });





});
