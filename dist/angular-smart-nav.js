/*! angular-smart-nav - v0.2.1 - 2016-06-14 */
'use strict';
/**
 * Module that detects the last scroll direction and
 * current scroll position to then add classes for
 * when the user is scrolling up or down the page
 * to show/hide the nav when scrolling in any particular
 * direction. Also when the user has scrolled beyond the
 * height of header adds a class to allow the nav to be
 * minimized or hidden.
 *
 * When the user has scrolled down the page the class
 * `sn-nav-scrolling-down` will be added, when scrolling up
 * `sn-nav-scrolling-up`. If the user has scrolled beyond the
 * height of the nav the class `sn-nav-minimise`.
 *
 * If the element is at the top of the viewport or above
 * it then the class `sn-nav-affix` will be added. This is useful
 * for making an element sticky when user has scrolled to it
 *
 * @module   sn.smartNav
 * @main     sn.smartNav
 * @author   SOON_
 */
angular.module('sn.smartNav', [

])
/**
 * Contains all css class names
 * @property {Object} SN_SMART_NAV_CLASSES
 */
.constant('SN_SMART_NAV_CLASSES', {
  scrollingUp: 'sn-nav-scrolling-up',
  scrollingDown: 'sn-nav-scrolling-down',
  minimise: 'sn-nav-minimise',
  affix: 'sn-nav-affix'
})
/**
 * @example
 *  `<nav sn-smart-nav></nav>`
 * @class   snSmartNav
 * @param   {Service} $window   : Angular.js wrapper for window Object
 * @param   {Service} $document : Angular.js wrapper for document Object
 * @param   {Object}  SN_SMART_NAV_CLASSES : Angular.js wrapper for document Object
 */
.directive('snSmartNav',[
  '$window',
  '$document',
  'SN_SMART_NAV_CLASSES',
  function ($window, $document, SN_SMART_NAV_CLASSES){
    return {
      restrict: 'A',
      link: function($scope, $element){
        /**
         * The last recorded scrollTop position
         * @private
         * @property lastScrollTop
         * @type     {Number}
         */
        var lastScrollTop = 0;
        /**
         * True if the last scroll direction was down the page
         * @private
         * @property scrollingDown
         * @type     {Boolean}
         */
        var scrollingDown = false;
        /**
         * @method getScrollTop
         * @returns {Number} the number of pixel from top of
         *                   page the user has scrolled
         */
        var getScrollTop = function getScrollTop() {
          var doc = $document[0].documentElement,
              body = $document[0].body,
              scrollTop = ( (doc && doc.scrollTop) || (body && body.scrollTop) || 0 );

          return scrollTop;
        };
        /**
         * The number of pixels from the top of the page
         * @property {Number} positionFromTop
         */
        var positionFromTop = (getScrollTop() + $element[0].getBoundingClientRect().top);
        /**
         * @method isScrollingDown
         * @private
         * @param  {Number}  currentScrollTop
         * @return {Boolean} True if last scroll direction is down
         */
        var isScrollingDown = function isScrollingDown(currentScrollTop){
          return currentScrollTop > lastScrollTop;
        };
        /**
         * @method isScrollingUp
         * @private
         * @param  {Number}  currentScrollTop
         * @return {Boolean} True if last scroll direction is up
         */
        var isScrollingUp = function isScrollingUp(currentScrollTop){
          return currentScrollTop < lastScrollTop;
        };
        /**
         * Calulate the current scroll direction and add relevent classes
         * @private
         * @method calScrollDir
         * @param  {Number} scrollTop
         */
        var calScrollDir = function calScrollDir(scrollTop){
          if ( scrollingDown && isScrollingUp(scrollTop) ) {
            scrollingDown = false;
            $element.removeClass(SN_SMART_NAV_CLASSES.scrollingDown);
            $element.addClass(SN_SMART_NAV_CLASSES.scrollingUp);
          } else if ( !scrollingDown && isScrollingDown(scrollTop) ){
            scrollingDown = true;
            $element.removeClass(SN_SMART_NAV_CLASSES.scrollingUp);
            $element.addClass(SN_SMART_NAV_CLASSES.scrollingDown);
          }
        };
        /**
         * Calulate if the user has scrolled beyond the height of the element
         * @private
         * @method calMinimisedMode
         * @param  {Number}  scrollTop
         */
        var calMinimisedMode = function calMinimisedMode(scrollTop){
          if (scrollTop > $element[0].offsetHeight) {
            $element.addClass(SN_SMART_NAV_CLASSES.minimise);
          } else {
            $element.removeClass(SN_SMART_NAV_CLASSES.minimise);
          }
        };
        /**
         * Calulate if the element is at top or above viewport
         * so we can 'affix' it to top of the viewport.
         * @private
         * @method calAffixedMode
         */
        var calAffixedMode = function calAffixedMode(scrollTop){
          if (scrollTop >= positionFromTop ) {
            $element.addClass(SN_SMART_NAV_CLASSES.affix);
          } else {
            $element.removeClass(SN_SMART_NAV_CLASSES.affix);
          }
        };
        /**
         * window `scroll` event handler.
         * Gets the current scroll postion and calulates
         * scroll direction and whether to enable minimise mode
         * @private
         * @method onScroll
         */
        var onScroll = function onScroll() {
          var scrollTop = getScrollTop();

          calScrollDir(scrollTop);
          calMinimisedMode(scrollTop);
          calAffixedMode(scrollTop);

          lastScrollTop = scrollTop;
        };
        /**
         * Clear event listeners
         * @method onDestroy
         */
        var onDestroy = function onDestroy(){
          angular.element($window).off('scroll', onScroll);
        };

        $scope.$on('$destroy', onDestroy);
        angular.element($window).on('scroll', onScroll);

        onScroll();
      }
    };
  }
]);

//# sourceMappingURL=angular-smart-nav.js.map