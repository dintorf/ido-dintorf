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
      answer: 1,
      people: [
        {}
      ]
    };

    $scope.rsvpSent = false;

    $scope.theDay = moment('11/05/2016');
    $scope.save_the_date = $scope.theDay.format('MM.DD.YYYY');
    $scope.today = moment(moment().format('MM/DD/YYYY'));

    $scope.countdown = $scope.today.to($scope.theDay);

    $scope.$watch('rsvp.answer', function(newValue, oldValue) {
      if(oldValue === '2'){
        $scope.rsvp.number = 1;
      } else if(newValue === '2'){
        $scope.rsvp.number = 2;
      }
    });

    $scope.$watch('rsvp.number', function(newValue, oldValue) {
      if(newValue > oldValue){
        $scope.rsvp.people.push({});
      } else if(newValue < oldValue){
        $scope.rsvp.people.pop();
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
        var num = $scope.rsvp.people.length;
        console.log(msg);
        var params = {
          Destination: { /* required */
            ToAddresses: [
              'dintorf@gmail.com',
              'danielle.palbykin@gmail.com',
              'dintorf+dzmszn1efmfwdaiwruwz@boards.trello.com'
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
              Data: $scope.rsvp.people[0].name + '(' + num + ') - Wedding RSVP' /* required */
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
      var msg = "";
      angular.forEach($scope.rsvp.people, function(value, index){
        msg += "Name" + (index+1) + ": " + value.name + "\n";
        msg += "Email" + (index+1) + ": " + value.email + "\n";
      });
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

    $scope.open = function(ev) {
      $mdDialog.show({
        controller: 'ImgModalCtrl',
        templateUrl: 'imgModal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false,
        locals : {
            source : ev.target.src
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
            name: "Danielle Palbykin",
            title: "Bride",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae hic ducimus porro, tenetur illo sunt molestias dolore dignissimos nisi optio asperiores tempore, error, ipsam! Necessitatibus architecto, tenetur molestias laboriosam itaque!"
          },
          {
            name: "Brittany Palbykin",
            title: "Maid of Honor",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae hic ducimus porro, tenetur illo sunt molestias dolore dignissimos nisi optio asperiores tempore, error, ipsam! Necessitatibus architecto, tenetur molestias laboriosam itaque!"
          },
          {
            name: "Lindsay Daly",
            title: "Matron of Honor",
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
            name: "Dylan Intorf",
            title: "Groom",
            details: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus, ducimus veritatis maxime! Ducimus quas sed molestias pariatur provident laudantium minus assumenda, perferendis ipsam molestiae voluptatem qui enim maiores animi, ullam?"
          },
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
        icon: 'info',
        title: 'Details',
        items: [
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='text-left cursive'><b>Ceremony</b></h1></div><div flex><span class='text-left uppercase md-title'><b>The Falls Event Center</b></span></div><md-button href='https://thefallseventcenter.com/location/gilbert/' target='_blank' class='md-raised md-accent md-hue-1 text-white'>Website <i class='fa fa-arrow-right'></i></md-button><div class='md-title text-left' flex><address>4635 E. Baseline Rd.<br>Gilbert, AZ 85234<br><abbr title='Phone'>P:</abbr> <a href='tel:4805352141'>480.535.2141</a></address></div><div class='text-left md-title' layout-padding flex>Wedding starts promptly at 4:30 PM, so find your seats by 4:25 PM or risk the bride's wrath!</div><br /><div class='text-left md-title' layout-padding flex>The ceremony will be roughly 30 minutes, and should include all of the following:</div><div class='text-left md-title' layout-padding flex><ul class='fa-ul'><li><i class='fa fa-arrow-right fa-fw'></i>&nbsp; Proud Parents</li><li><i class='fa fa-arrow-right fa-fw'></i>&nbsp; Some Sort of Vows</li><li><i class='fa fa-diamond fa-fw'></i>&nbsp; Exchange of Something Sparkly</li><li><i class='fa fa-arrow-right fa-fw'></i>&nbsp; Oohs and Aahs</li><li><i class='fa fa-arrow-right fa-fw'></i>&nbsp; One Life-Altering Kiss</li></ul></div></div>",
          },
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='text-left cursive'><b>Cocktails/Photos</b></h1></div><div class='text-left md-title' layout-padding flex><ul class='fa-ul'><li class='uppercase'><b>If you are immediate family</b></li><li>After the ceremony, we are holding you hostage for photos. We promise to keep it as short and sweet as possible!</li><li>&nbsp;</li><li class='uppercase'><b>If you are a friend</b></li><li>Run away! Dash on over to the cocktail hour area for drinks and tasty snacks while the family snaps some photos. Don't worry, we will come by later for your photo op with the happy couple!</li><li>&nbsp;</li><li class='uppercase'><b>If you are a neither</b></li><li>Thanks so much for coming to our big event! We'll just go ahead and file you with the \"friends\" and encourage you to have a snack and mingle a little bit.</li></ul></div></div>",
          },
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='text-left cursive'><b>Reception</b></h1></div><div class='text-left md-title' layout-padding flex>Starts at 6:00 PM. Dinner will be served buffet style, and will be interrupted by various toasts, possibly a few tears, and laughter.</div><br /><div class='text-left md-title' layout-padding flex>After our bellies are full, there will be dancing, kicked off by the newly weds!</div><br /><div class='text-left md-title' layout-padding flex>Right about the time your feet start to ache from the sheer awesomeness of your dance moves, we will cut and serve the cake, ensuring a sugar high that will keep us dancing until 11:00 PM.</div></div>",
          }
        ]
      },
      {
        icon: 'hotel',
        title: 'Where to Stay',
        items: [
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='cursive text-left'><b>The Residence Inn</b></h1></div><md-button href='#' target='_blank' class='md-raised md-accent md-hue-1 text-white'>Reservation <i class='fa fa-arrow-right'></i></md-button><div class='md-title text-left' flex><address>3021 E.  Banner Gateway Dr.<br>Gilbert, AZ  85234<br><abbr title='Phone'>P:</abbr> <a href='tel:4806994450'>480.699.4450</a></address></div><div class='text-left md-title' layout-padding flex><ul class='fa-ul'><li><i class='fa fa-wifi fa-fw'></i>&nbsp; Free Wifi</li><li><i class='fa fa-cutlery fa-fw'></i>&nbsp; Complimentary Breakfast</li><li><i class='fa fa-car fa-fw'></i>&nbsp; Less Than 1 Mile From Venue</li><li><i class='fa fa-bus fa-fw'></i>&nbsp; Free Shuttle to Venue Until 10:00 PM</li><li><i class='fa fa-shopping-cart fa-fw'></i>&nbsp; Shopping/Restaurants Within &frac12; Mile</li></ul></div></div></div>",
          },
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='cursive text-left'><b>Hampton Inn & Suites</b></h1><span>**Bride and Groom will be here!</span></div><md-button href='http://hamptoninn.hilton.com/en/hp/groups/personalized/P/PHXGTHX-PIW-20161102/index.jhtml' target='_blank' class='md-raised md-accent md-hue-1 text-white'>Reservation <i class='fa fa-arrow-right'></i></md-button><div class='md-title text-left' flex><address>3265 S. Market St.<br>Gilbert, AZ  85297<br><abbr title='Phone'>P:</abbr> <a href='tel:4805431500'>480.543.1500</a></address></div><div class='text-left md-title' layout-padding flex><ul class='fa-ul'><li><i class='fa fa-wifi fa-fw'></i>&nbsp; Free Wifi</li><li><i class='fa fa-cutlery fa-fw'></i>&nbsp; Complimentary Breakfast</li><li><i class='fa fa-car fa-fw'></i>&nbsp; 15 Minutes From Venue</li><li><i class='fa fa-bus fa-fw'></i>&nbsp; Free Shuttle to Venue Until 11:00 PM</li><li><i class='fa fa-shopping-cart fa-fw'></i>&nbsp; Shopping/Restaurants Within &frac12; Mile</li></ul></div></div></div>",
          },
          {
            details: "<div layout='column' layout-align='center center'><div flex><h1 class='cursive text-left'><b>Hyatt Place</b></h1></div><md-button href='http://www.gilbert.place.hyatt.com/en/hotel/home.html?corp_id=G-INPA' target='_blank' class='md-raised md-accent md-hue-1 text-white'>Reservation <i class='fa fa-arrow-right'></i></md-button><div class='md-title text-left' flex><address>3275 S. Market St.<br>Gilbert, AZ  85297<br><abbr title='Phone'>P:</abbr> <a href='tel:4808995900'>480.899.5900</a></address></div><div class='text-left md-title' layout-padding flex><ul class='fa-ul'><li><i class='fa fa-wifi fa-fw'></i>&nbsp; Free Wifi</li><li><i class='fa fa-cutlery fa-fw'></i>&nbsp; Complimentary Breakfast</li><li><i class='fa fa-car fa-fw'></i>&nbsp; 15 Minutes From Venue</li><li><i class='fa fa-shopping-cart fa-fw'></i>&nbsp; Shopping/Restaurants Within &frac12; Mile</li></ul></div></div></div>",
          }
        ]
      }
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