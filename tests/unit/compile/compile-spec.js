describe('unit test : dr-compile directive',function(){

  var DIROOP_COMPILE_TEMPLATE='<div dr-compile="test"></div>'

  var _rootScope,
      _compile;

  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,$compile){
      _rootScope = $rootScope;
      _compile=$compile;
  }));

  it('should compile without error',function(){
      var $scope= _rootScope.$new(true);
      $scope.test = '<strong>success</strong>';
      var element = _compile(DIROOP_COMPILE_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('success');
      $scope.$destroy();
  });

});
