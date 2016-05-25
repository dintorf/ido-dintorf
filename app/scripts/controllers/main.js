'use strict';

/**
 * @ngdoc function
 * @name idodintorfcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idodintorfcomApp
 */
angular.module('idodintorfcomApp')
  .controller('MainCtrl', function ($scope, $sce, $uibModal, $mdDialog, $mdMedia) {
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

    $scope.open = function(ev, source) {
      $mdDialog.show({
        controller: 'ImgModalCtrl',
        templateUrl: 'imgModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false,
        locals : {
            source : source
        }
      });

      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };

    // $scope.open = function (source) {

    //   var modalInstance = $uibModal.open({
    //     templateUrl: 'imgModal.html',
    //     controller: 'ImgModalCtrl',
    //     // size: 'lg',
    //     resolve: {
    //       source: function () {
    //         return source;
    //       }
    //     }
    //   });

    //   modalInstance.result.then(function (selectedItem) {
    //     $scope.selected = selectedItem;
    //   }, function () {
    //     $log.info('Modal dismissed at: ' + new Date());
    //   });
    // };

    $scope.teams = [
      {
        type: "Bridesmaids",
        people: [
          {
            name: "Brittany Palbykin",
            title: "Maid of Honor",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae hic ducimus porro, tenetur illo sunt molestias dolore dignissimos nisi optio asperiores tempore, error, ipsam! Necessitatibus architecto, tenetur molestias laboriosam itaque!"
          },
          {
            name: "Lindsay Daly",
            title: "Maid of Honor",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit necessitatibus totam dolorum corporis cumque, quas sit, quidem itaque tempora maxime libero, omnis aliquid? Incidunt recusandae, minima ad sunt? Hic, rem?"
          },
          {
            name: "Marci Looper",
            title: "Bridesmaid",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati nesciunt adipisci qui totam optio voluptates, similique aut quas iusto perspiciatis ullam officia explicabo voluptatibus. Illo necessitatibus porro inventore odio commodi."
          },
          {
            name: "Ellie Morrissey",
            title: "Bridesmaid",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda voluptatem ipsa aperiam commodi, cupiditate vero beatae. Eius iste, alias soluta error rerum beatae, explicabo laboriosam facere libero accusantium voluptas sint."
          },
          {
            name: "Dana Shepherd",
            title: "Bridesmaid",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, ab expedita eius maxime, excepturi culpa recusandae error. Magni, accusamus, iste. Blanditiis incidunt labore saepe deleniti accusantium, odio explicabo nulla reprehenderit!"
          }
        ]
      },
      {
        type: "Groomsmen",
        people: [
          {
            name: "Adam Rosamilia",
            title: "Best Man",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ducimus veritatis maxime! Ducimus quas sed molestias pariatur provident laudantium minus assumenda, perferendis ipsam molestiae voluptatem qui enim maiores animi, ullam?"
          },
          {
            name: "Scott Daly",
            title: "Groomsman",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus quae, ex fuga, asperiores cupiditate reprehenderit tempore atque. Quae fugit, cumque accusamus eos dicta ex consequuntur impedit nisi dolorum, ipsa dignissimos?"
          },
          {
            name: "Trevor Sears",
            title: "Groomsman",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe impedit eos velit modi aliquam doloribus placeat repellendus quidem quas dolor eligendi quaerat natus sed assumenda tempora voluptates blanditiis, dolore."
          },
          {
            name: "Billy Becker",
            title: "Groomsman",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi dolores, ut in ducimus doloremque dolor cumque, natus minima illum quae veniam eaque velit minus dicta tempora eum accusantium asperiores!"
          },
          {
            name: "Matt Wittpenn",
            title: "Groomsman",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque est, ducimus repellat aspernatur accusantium quis natus dolorem atque nobis eaque, nam nihil sit accusamus soluta animi eligendi quos, voluptates unde?"
          }
        ]
      }
    ];

    $scope.tips = [
      {
        icon: 'hotel',
        title: 'Where to Stay',
        details: "<h4 class='md-title text-center'><b>Hampton Inn & Suites by Hilton</b></h4><p class='md-title'>We have reserved both single and double rooms at the brand new Hampton Inn! Please reach out to Samantha via the contact information below to reserve your room and make sure you mention the Intorf/Palbykin Wedding. <br><br> Phone: (480)-654-4000 <br> Email: Samantha.Lehrer2@hiltion.com.</p>",
      },
      {
        icon: 'timeline',
        title: 'Timeline',
        details: "<h4 class='md-title text-center'><b>Coming soon</b></h4>",
      },
      {
        icon: 'directions_bus',
        title: 'Transportation',
        details: "<h4 class='md-title text-center'><b>Coming soon</b></h4>",
      },
    ];

    $('#galleryModal').on('show.bs.modal', function (e) {
       $('#galleryImage').attr('src',$(e.relatedTarget).data('src'));
    });
  });

angular.module('idodintorfcomApp')
  .controller('ImgModalCtrl', function ($scope, $mdDialog, source) {

    $scope.source = source;

    $scope.close = function () {
      $mdDialog.hide();
    };
  });