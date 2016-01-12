'use strict';

/**
 * @ngdoc function
 * @name idodintorfcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idodintorfcomApp
 */
angular.module('idodintorfcomApp')
  .controller('MainCtrl', function ($scope, $sce, instagram) {
    $scope.rsvp = {
      answer: 1
    };

    $scope.$watch('rsvp.answer', function(newValue, oldValue) {
      if(oldValue === '2'){
        delete $scope.rsvp.plus1;
      }
    });

    $scope.send = function(isValid){
      console.log(isValid, $scope.rsvp);
    };

    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    $scope.images = [
        { src: '//splashbase.s3.amazonaws.com/unsplash/regular/photo-1430916273432-273c2db881a0%3Fq%3D75%26fm%3Djpg%26w%3D1080%26fit%3Dmax%26s%3Df047e8284d2fdc1df0fd57a5d294614d'},
        { src: '//splashbase.s3.amazonaws.com/getrefe/regular/tumblr_nqune4OGHl1slhhf0o1_1280.jpg'},
        { src: '//splashbase.s3.amazonaws.com/unsplash/regular/photo-1433959352364-9314c5b6eb0b%3Fq%3D75%26fm%3Djpg%26w%3D1080%26fit%3Dmax%26s%3D3b9bc6caa190332e91472b6828a120a4'},
        { src: '//splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-moto-drawing-illusion-nabeel-1440x960.jpg'},
        { src: '//splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-new-york-crosswalk-nabeel-1440x960.jpg'},
        { src: '//splashbase.s3.amazonaws.com/lifeofpix/regular/Life-of-Pix-free-stock-photos-clothes-exotic-travel-nabeel-1440x960.jpg'},
      ];

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr('src',$(e.relatedTarget).data('src'));
    });

    instagram.fetchHashtag("dogs", function(data) {
        for(var i=0; i<data.length; i++) {
          if (typeof $scope.have[data[i].id]==="undefined") {
            $scope.pics.push(data[i]) ;
            $scope.have[data[i].id] = "1";
          }
        }
    });
  });
