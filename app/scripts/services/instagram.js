'use strict';

angular.module('idodintorfcomApp')
    .factory('instagram', ['$http',
        function($http) {
            return {
                fetchHashtag: function(tag, callback) {
                    var endPoint = "https://api.instagram.com/v1/tags/"+tag+"/media/recent?access_token=306851746.3da590f.926d97e85d9c4444aecdd86f56627738";
                    $http.jsonp(endPoint).success(function(response) {
                        console.log(response);
                        callback(response.data);
                    });
                }
            }
        }
    ]);