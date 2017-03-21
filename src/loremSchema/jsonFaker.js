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
