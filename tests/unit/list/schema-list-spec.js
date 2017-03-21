describe('unit test : dr-schema-list',function(){
  var DIROOP_COMPILE_TEMPLATE='<dr:schema:list></dr:schema:list>';
  var _rootScope,
      _compile;
  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,$compile){
      _rootScope = $rootScope;
      _compile=$compile;
  }));

  it('should compile without error',function(){
      var $scope= _rootScope.$new(true);
      var element = _compile(DIROOP_COMPILE_TEMPLATE)($scope);
      $scope.$digest();
      expect(element.html()).toContain('dr-schema-list-item');
      $scope.$destroy();
  });


});
