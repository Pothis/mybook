"use strict";
function Feed(_id, _type) {
	var id = _id;
	var type = _type;
};

Feed.prototype.getId = function() {
	return this.id;
};

Feed.prototype.getType = function() {
	return this.type;
};

var URLFeed = Object.prototype.create(Feed);
URLFeed.url = "";
URLFeed.prototype.getFeed = function () {
	return this.url;
};

var TextFeed = Object.prototype.create(Feed);
TextFeed.text = "";
TextFeed.prototype.getFeed = function () {
	return this.text;
};

