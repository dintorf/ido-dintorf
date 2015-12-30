'use strict';

/**
 * @ngdoc overview
 * @name idodintorfcomApp
 * @description
 * # idodintorfcomApp
 *
 * Main module of the application.
 */
angular.module('idodintorfcomApp', [
    'ngMaterial',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase',
    'firebase.ref',
    'firebase.auth'
  ])
    .config(function($mdThemingProvider) {
      // Extend the theme with a few different colors
      var primary = $mdThemingProvider.extendPalette('deep-purple', {
        '500': '39006A'
      });
      var accent = $mdThemingProvider.extendPalette('green', {
        'A200': '85EC84',
        'A700': '71B265',
      });
      var warn = $mdThemingProvider.extendPalette('pink', {
        '500': 'B299B0',
        'A100': 'CCBDB4'
      });
      // Register the new color palette map with the name <code>idodintorfPrimary</code>
      $mdThemingProvider.definePalette('idodintorfPrimary', primary);
      $mdThemingProvider.definePalette('idodintorfAccent', accent);
      $mdThemingProvider.definePalette('idodintorfWarn', warn);

      // Use that theme for the primary intentions
      $mdThemingProvider.theme('default')
        .primaryPalette('idodintorfPrimary')
        .accentPalette('idodintorfAccent')
        .warnPalette('idodintorfWarn')
        .backgroundPalette('grey');
    });
