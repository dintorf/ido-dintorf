'use strict';

/**
 * @ngdoc function
 * @name idodintorfcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idodintorfcomApp
 */
angular.module('idodintorfcomApp')
  .controller('MainCtrl', function ($scope, $sce, $uibModal) {
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

    $scope.open = function (source) {

      var modalInstance = $uibModal.open({
        templateUrl: 'imgModal.html',
        controller: 'ImgModalCtrl',
        size: 'lg',
        resolve: {
          source: function () {
            return source;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };

    $scope.teams = [
      {
        type: "Bridesmaids",
        people: [
          {
            name: "Brittany",
            title: "Co-Made of Honor",
            img: "",
            details: "Brittany's details..."
          },
          {
            name: "Lindsay",
            title: "Co-Made of Honor",
            img: "",
            details: "Lindsay's details..."
          },
          {
            name: "Marci",
            title: "Bridesmaid",
            img: "",
            details: "Marci's details..."
          },
          {
            name: "Ellie",
            title: "Bridesmaid",
            img: "",
            details: "Ellie's details..."
          },
          {
            name: "Dana",
            title: "Bridesmaid",
            img: "",
            details: "Dana's details..."
          }
        ]
      },
      {
        type: "Groomsmen",
        people: [
          {
            name: "Adam",
            title: "Best Man",
            img: "",
            details: "Adam's details..."
          },
          {
            name: "Scott",
            title: "Groomsman",
            img: "",
            details: "Scott's details..."
          },
          {
            name: "Matt",
            title: "Groomsman",
            img: "",
            details: "Matt's details..."
          },
          {
            name: "Trevor",
            title: "Groomsman",
            img: "",
            details: "Trevor's details..."
          },
          {
            name: "Billy",
            title: "Groomsman",
            img: "",
            details: "Billy's details..."
          }
        ]
      }
    ];

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr('src',$(e.relatedTarget).data('src'));
    });
  });

angular.module('idodintorfcomApp')
  .controller('ImgModalCtrl', function ($scope, $uibModalInstance, source) {

    $scope.source = source;

    $scope.close = function () {
      $uibModalInstance.dismiss('close');
    };
  });