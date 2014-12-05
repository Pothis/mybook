"use strict";

// Declare app level module which depends on views, and components
var feedModule = angular.module("feedModule", ["ngRoute", "credential"]);

feedModule.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
  $routeProvider.when("/login", {
    templateUrl: "/app/login.html",
    controller: "LoginController",
    controllerAs: "LoginCtrl"
  }).
  when("/mypage", {
    templateUrl: "/app/mypage.html",
    controller: "FeedController",
    controllerAs: "FeedCtrl"
  });
  $locationProvider.html5Mode(true);
}]);

feedModule.run(function($location) {
  $location.path("/login");
});

feedModule.factory("feedService", function () {
  var feedStore = [],
      feedIdCounter = 1,
      feed,
      Feed = function (id, type, content, createdTime) {
        this.id = id;
        this.type = type;
        this.content = content;
        this.createdTime = createdTime;
      },
      profiles = [],
      usernameMinLen = 3,
      usernameMaxLen = 50,
      minAge = 0,
      maxAge = 100,
      phoneMinLen = 5,
      phoneMaxLen = 15,
      userIdCounter = 1;


  return {

    createFeed: function (feedContent) {
      feed = new Feed(this.getFeedId(), "Text", feedContent, getTime());
      feedStore.push(feed);
    },
    deleteFeed: function (feedId) {
      try {
        var x = feedStore.length,
        i;
        for (i = 0; i < x; i++) {
          if (feedId === feedStore[i].getId()) {
            feedStore.splice(i, 1);
          }
        }
      } catch (e) {
        $console.log(e);
      }
    },
    getFeeds: function () {
      return feedStore;
    },
    getFeedId: function () {
      return feedIdCounter++;
    },
    saveProfile: function (profile) {
      if (profile) {
        profiles.push(profile);
      }
    },
    getProfile: function () {
      return profiles.length ? profiles[profiles.length - 1] : {};
    },
    getUsernameMaxLen: function () {
      return usernameMaxLen;
    },
    getUsernameMinLen: function () {
      return usernameMinLen;
    },
    getMinAge: function () {
      return minAge;
    },
    getMaxAge: function () {
      return maxAge;
    },
    getPhoneMinLen: function () {
      return phoneMinLen;
    },
    getPhoneMaxLen: function () {
      return phoneMaxLen;
    }
  }
});

feedModule.controller("FeedController", ["$scope", "$rootScope", "$location", "feedService",
function ($scope, $rootScope, $location, feedService) {

  $scope.type = "";
  $scope.feedChecked = true;
  $rootScope.error = "";
  $scope.imgSrc = undefined;
  $scope.profile = {};

  $scope.createFeed = function () {
    feedService.createFeed();
  };

  $scope.deleteFeed = function (feedId) {
    feedService.deleteFeed(feedId);
  };

  this.getFeeds = function () {
    return feedService.getFeeds();
  };

  $scope.logout = function () {
      $rootScope.error = "";
      $location.path("/login");
      $location.replace();
  };

  $scope.feeds = this.getFeeds();

  $scope.canSave = function () {
      console.log($scope.name.length > 0 && $scope.age.length > 0 && $scope.phone.length > 0 && $scope.email.length > 0);
      return $scope.name.length > 0 && $scope.age.length > 0 &&
             $scope.phone.length > 0 && $scope.email.length > 0;
  }

  $scope.save = function () {
      if ($scope.validateForm()) {
        feedService.saveProfile($scope.profile);
      }
  }

  $scope.getProfile = function () {
      $scope.profile = feedService.getProfile();
  }

  $scope.validateForm = function () {

      $rootScope.error = "";

      var regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

      if ($scope.profile.name.length == 0) {
          $rootScope.error = "Sorry, User name cannot be empty...";
          return false;
      } else if ($scope.profile.name.length > feedService.getUsernameMaxLen()) {
          $rootScope.error = "Sorry, User name cannot exceed " +
                              feedService.getUsernameMaxLen() +
                              " characters...";
          return false;
      } else if ($scope.profile.name.length < feedService.getUsernameMinLen()) {
          $rootScope.error = "Sorry, User name should atleast be " +
                              feedService.getUsernameMinLen() +
                              " characters...";
          return false;
      } if ($scope.profile.age.length == 0) {
          $rootScope.error = "Sorry, Age cannot be empty...";
          return false;
      } else if (isNaN($scope.profile.age) ||
          $scope.profile.age < feedService.getMinAge() ||
          $scope.profile.age > feedService.getMaxAge()) {
            $rootScope.error = "Sorry, Age should be a number between " +
                                feedService.getMinAge() + " and " +
                                feedService.getMaxAge() + "...";
          return false;
      } else if (isNaN($scope.profile.phone) ||
        profile.phone.length < feedService.getPhoneMinLen() ||
        profile.phone.length > feedService.getPhoneMaxLen()) {
          $rootScope.error = "Sorry, Phone number should be numbers and between " +
                              feedService.getPhoneMinLen() + " - " +
                              feedService.getPhoneMaxLen() + " digits...";
          return false;
      }  else if ($scope.profile.email.length == 0) {
          $rootScope.error = "Sorry, Email address cannot be empty...";
          return false;
      } else if (!$scope.profile.email.match(regex)) {
          $rootScope.error = "Sorry, Invalid Email address...";
          return false;
      }
      return true;
  }
}]);

feedModule.directive("myFeed", function () {
  return {
    scope: {},
    templateUrl: "/app/feed.html"
  };
});
