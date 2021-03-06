'use strict';

describe('sn.smartNav', function (){

  var element, $scope, $rootScope, $document, $window, SN_SMART_NAV_CLASSES;

  beforeEach(module('sn.smartNav'));

  describe('element at top of page', function (){

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();

      $window = $injector.get('$window');

      $document = $injector.get('$document');
      $document[0] = {
        body: {
          scrollTop: 0
        }
      };

      SN_SMART_NAV_CLASSES = $injector.get('SN_SMART_NAV_CLASSES');

      element = '<nav sn-smart-nav style="height: 160px"></nav>';

      element = $compile(element)($scope);
      $scope.$digest();

    }));

    afterEach(function(){
      $rootScope.$broadcast('$destroy');
    });

    it('should add "scrolling-down" class', function(){
      $document[0].body.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.scrollingDown)).toBe(false);

      $document[0].body.scrollTop = 100;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.scrollingDown)).toBe(true);
    });

    it('should add "scrolling-up" class', function(){
      $document[0].documentElement = {
        scrollTop: 0
      };
      $document[0].body = undefined;

      $document[0].documentElement.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');

      $document[0].documentElement.scrollTop = 100;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.scrollingUp)).toBe(false);

      $document[0].documentElement.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.scrollingUp)).toBe(true);
    });

    it('should add "minimised-mode" class', function(){
      $document[0].body.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.minimise)).toBe(false);

      $document[0].body.scrollTop = 200;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.minimise)).toBe(true);
    });

  });

  describe('element not at top of page', function (){

    beforeEach(inject(function (_$rootScope_, $compile, $injector) {
      $rootScope = _$rootScope_;

      $scope = $rootScope.$new();

      $window = $injector.get('$window');

      $document = $injector.get('$document');
      $document[0] = {
        documentElement: {
          scrollTop: 0
        }
      };

      element = '<nav sn-smart-nav style="height: 160px; margin-top: 100px;"></nav>';

      element = $compile(element)($scope);
      $scope.$digest();

    }));

    it('should add "affix" class', function(){
      $document[0].documentElement.scrollTop = -250;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.affix)).toBe(false);

      $document[0].documentElement.scrollTop = 0;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.affix)).toBe(true);

      $document[0].documentElement.scrollTop = 250;
      angular.element($window).triggerHandler('scroll');
      expect(element.hasClass(SN_SMART_NAV_CLASSES.affix)).toBe(true);
    });

  });


});
