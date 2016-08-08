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
    'firebase.auth',
    'ui.bootstrap'
  ])
    .config(function($mdThemingProvider) {
      // Extend the theme with a few different colors
      $mdThemingProvider.definePalette('idodintorfPallette', {
        '50':  'ffffff',
        '100': 'cbc7d8', 
        '200': 'ffffff', 
        '300': 'ffffff',
        '400': '9d9ebc', 
        '500': 'b2c1ba',
        '600': 'f2edea', 
        '700': 'ffffff', 
        '800': 'ffffff',
        '900': 'ffffff', 
        'A100': 'ffffff',
        'A200': '9d9ebc',
        'A400': '4f5275',
        'A700': '6d6e83',
      });


      // Use that theme for the primary intentions
      $mdThemingProvider.theme('default')
        .primaryPalette('idodintorfPallette', {
          'default': '400', // by default use shade 400 from the idodintorf palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
        })
        // If you specify less than all of the keys, it will inherit from the
        // default shades
        .accentPalette('idodintorfPallette', {
          'default': 'A200', // use shade A200 for default, and keep all other shades the same
          'hue-1': 'A400', // use shade A400 for the <code>md-hue-1</code> class
          'hue-2': 'A700', // use shade A700 for the <code>md-hue-2</code> class
        });
    });
