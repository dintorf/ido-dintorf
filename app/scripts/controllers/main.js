'use strict';

/**
 * @ngdoc function
 * @name idodintorfcomApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the idodintorfcomApp
 */
angular.module('idodintorfcomApp')
  .controller('MainCtrl', function ($scope, $sce, $uibModal, $mdDialog, $mdMedia, $http) {
    $scope.rsvp = {
      answer: 1
    };

    $scope.rsvpSent = false;

    $scope.theDay = moment('11/05/2016');
    $scope.save_the_date = $scope.theDay.format('MM.DD.YYYY');
    $scope.today = moment(moment().format('MM/DD/YYYY'));

    $scope.countdown = $scope.today.to($scope.theDay);

    $scope.$watch('rsvp.answer', function(newValue, oldValue) {
      if(oldValue === '2'){
        delete $scope.rsvp.plus1;
      }
    });

    $scope.aws = {};

    $http.get('/scripts/config.json').then(function(response) {
      $scope.aws = response.data;
    });

    $scope.send = function(isValid){
      console.log(isValid, $scope.rsvp);
      if(isValid){
        var ses = new AWS.SES({accessKeyId: $scope.aws.accessKey, secretAccessKey: $scope.aws.secretKey, region: 'us-west-2'});
        var msg = $scope.formatMsg();
        var params = {
          Destination: { /* required */
            ToAddresses: [
              'dintorf@gmail.com'//,
              // 'danielle.palbykin@gmail.com'
              /* more items */
            ]
          },
          Message: { /* required */
            Body: { /* required */
              Text: {
                Data: msg /* required */
              }
            },
            Subject: { /* required */
              Data: 'Wedding RSVP' /* required */
            }
          },
          Source: 'Intorf/Palbykin Wedding <dylan@dintorf.com>' /* required */
        };

        ses.sendEmail(params, function(err, data) {
          if (err) $scope.rsvpError = err; // an error occurred
          else{     
            $scope.$apply(function(){
              $scope.rsvpSent = true;       // successful response
            });
          }
        });
      }
    };

    $scope.formatMsg = function(){
      var msg = "Name: " + $scope.rsvp.name + "\n";
      msg += "Email: " + $scope.rsvp.email + "\n";
      if($scope.rsvp.plus1){
        msg += "Plus1 Name: " + $scope.rsvp.plus1.name + "\n";
        msg += "Plus1 Email: " + $scope.rsvp.plus1.email + "\n";
      }
      if($scope.rsvp.note){
        msg += "Note: " + $scope.rsvp.note;
      }
      return msg;
    }

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
            name: "Matt Wittpenn",
            title: "Groomsman",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque est, ducimus repellat aspernatur accusantium quis natus dolorem atque nobis eaque, nam nihil sit accusamus soluta animi eligendi quos, voluptates unde?"
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
          }
        ]
      }
    ];

    $scope.tips = [
      {
        icon: 'hotel',
        title: 'Where to Stay',
        items: [
          {
            details: "<h4 class='md-title text-center'><b>Hyatt Place</b></h4><p class='md-title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi dolores, ut in ducimus doloremque dolor cumque, natus minima illum quae veniam eaque velit minus dicta tempora eum accusantium asperiores!</p><br/>",
          },
          {
            details: "<h4 class='md-title text-center'><b>Hampton Inn & Suites</b></h4><p class='md-title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi dolores, ut in ducimus doloremque dolor cumque, natus minima illum quae veniam eaque velit minus dicta tempora eum accusantium asperiores!</p><br/>",
          },
          {
            details: "<h4 class='md-title text-center'><b>Marriott Residence Inn</b></h4><p class='md-title'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur commodi dolores, ut in ducimus doloremque dolor cumque, natus minima illum quae veniam eaque velit minus dicta tempora eum accusantium asperiores!</p><br/>",
          }
        ]
      },
      {
        icon: 'timeline',
        title: 'Timeline',
        items: [
          {
            details: "<h4 class='md-title text-center'><b>Coming soon</b></h4><p></p><br/>",
          }
        ]
      },
      {
        icon: 'directions_bus',
        title: 'Transportation',
        items: [
          {
            details: "<h4 class='md-title text-center'><b>Coming soon</b></h4><p></p><br/>",
          }
        ]
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