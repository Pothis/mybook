"use strict";

var Feed = function (id, type, content, createdTime) {
    this.id = id;
    this.type = type;
    this.content = content;
    this.createdTime = createdTime;
};

var feedModule = angular.module("feed", ["credential", "profileModule"]);
feedModule.controller("FeedController", ["$scope", "$rootScope", "feedService", function ($scope, $rootScope, feedService) {

	$scope.type = "";
    $rootScope.error = "";
    
        
    $scope.createFeed = function () {
        feedService.createFeed();
    };
    
    $scope.deleteFeed = function (feedId) {
        feedService.deleteFeed(feedId); 
    };
    
    $scope.getFeeds = function () {
        return feedService.getFeeds();   
    }
    
}]);

feedModule.factory("feedService", function () {
	var feedStore = [],
	    feedIdCounter = 1,
        feed;
	
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
		}
	}
});