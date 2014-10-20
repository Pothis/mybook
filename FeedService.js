var FEEDSERVICE = (function() {
"use strict";
	var feedStore = [];
	
	return {
		createFeed: function (feed) {
			this.feedStore.push(feed);
		},
		deleteFeed: function (feedId) {
			try {
				for (var i = 0; x = this.feedStore.length; i < x; i++) {
					if (feedId === this.feedStore[i].getId()) {
						this.feedStore.splice(i, 1);
					}
				}
			} catch (e) {
				console.log(e);
			}
		}
	};
})();