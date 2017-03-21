describe('unit test : <dr:ui:version/> directive',function(){

  var DIROOP_VERSION_TEMPLATE='<dr:ui:version/>'

  var _rootScope,
      _compile;

  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,$compile){
      _rootScope = $rootScope;
      _compile=$compile;
  }));

  it('should compile without error',function(){
      var $scope= _rootScope.$new(true);
      var element = _compile(DIROOP_VERSION_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('diroop.ui :');
      $scope.$destroy();
  });

});
