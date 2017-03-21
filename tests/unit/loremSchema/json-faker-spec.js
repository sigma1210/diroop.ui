describe('unit test : drMockJsonService',function(){

  var _rootScope,
      _drMockJsonService;

  beforeEach(module('diroop.ui'));

  beforeEach(inject(function($rootScope,drMockJsonService){
      _rootScope = $rootScope;
      _drMockJsonService=drMockJsonService;
  }));

  it('should exist',function(){
    expect(_drMockJsonService).not.toBeUndefined();
  });

  it('should be able to mock a know valid schema',function(done){
    var TEST_SCHEMA_1 = {
              "type": "object",
              "required": ["firstName", "lastName"],
              "properties": {
                "firstName": {
                    "title": "First Name",
                    "type": "string"
                },
                "middleName": {
                    "title": "Middle Name",
                    "type": "string"
                },
                "lastName": {
                    "title": "Last Name",
                    "type": "string"
                }
              }
          };

    function _testSuccess(response){
        expect(response).not.toBeUndefined();
        expect(response.firstName).not.toBeUndefined();
        expect(response.lastName).not.toBeUndefined();
    }
    function _testError(error){
      expect(error).toBeUndefined();
    }
    _drMockJsonService
        .getFake(TEST_SCHEMA_1)
        .then(_testSuccess)
        .catch(_testError)
        .finally(done);
       _rootScope.$apply();
  });



});
