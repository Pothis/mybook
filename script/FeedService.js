var  = (function() {
"use strict";
	var feedStore = [];
	var feedIdCounter = 1;
	
	return {
		createFeed: function (feed) {
			feedStore.push(feed);
		},
		deleteFeed: function (feedId) {
			try {
				for (var i = 0, x = feedStore.length; i < x; i++) {
					if (feedId == feedStore[i].getId()) {
						feedStore.splice(i, 1);
					}
				}
			} catch (e) {
				console.log(e);
			}
		},
		getFeeds: function () {
			return feedStore;
		},
		getFeedId: function() {
			return feedIdCounter++;
		}
	}
})();