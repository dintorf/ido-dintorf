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

    $scope.theDay = moment('11/05/2016');
    $scope.save_the_date = $scope.theDay.format('MM.DD.YYYY');
    $scope.today = moment(moment().format('MM/DD/YYYY'));

    $scope.countdown = $scope.today.to($scope.theDay);

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
            title: "Maid of Honor",
            img: "",
            details: ""
          },
          {
            name: "Lindsay",
            title: "Maid of Honor",
            img: "",
            details: ""
          },
          {
            name: "Marci",
            title: "Bridesmaid",
            img: "",
            details: ""
          },
          {
            name: "Ellie",
            title: "Bridesmaid",
            img: "",
            details: ""
          },
          {
            name: "Dana",
            title: "Bridesmaid",
            img: "",
            details: ""
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
            details: ""
          },
          {
            name: "Scott",
            title: "Groomsman",
            img: "",
            details: ""
          },
          {
            name: "Trevor",
            title: "Groomsman",
            img: "",
            details: ""
          },
          {
            name: "Billy",
            title: "Groomsman",
            img: "",
            details: ""
          },
          {
            name: "Matt",
            title: "Groomsman",
            img: "",
            details: ""
          }
        ]
      }
    ];

    $scope.tips = [
      {
        icon: 'h-square',
        title: 'Where to Stay',
        details: "<h4 class='text-center'>Hampton Inn & Suites by Hilton</h4> We have reserved both single and double rooms at the brand new Hampton Inn! Please reach out to Samantha via the contact information below to reserve your room and make sure you mention the Intorf/Palbykin Wedding. <br><br> Phone: (480)-654-4000 <br> Email: Samantha.Lehrer2@hiltion.com.",
      },
      {
        icon: 'clock-o',
        title: 'Timeline',
        details: "<h4 class='text-center'>Coming soon</h4>",
      },
      {
        icon: 'bus',
        title: 'Transportation',
        details: "<h4 class='text-center'>Coming soon</h4>",
      },
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