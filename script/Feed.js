"use strict";
function Feed(_id, _type, _createdTime) {
	var id = _id;
	var type = _type;
	var createdTime = _createdTime;
}

Feed.prototype.getId = function() {
	return this.id;
}

Feed.prototype.getType = function() {
	return this.type;
};

Feed.prototype.getCreatedTime = function() {
	return this.createdTime;
};

function URLFeed(_id, _type, _createdTime) {
	this.id 		 = _id;
	this.type 		 = _type;
	this.createdTime = _createdTime;
	Feed.call(this);
};

URLFeed.prototype = Object.create(Feed.prototype);
URLFeed.prototype.constructor = URLFeed;
URLFeed.prototype.url = undefined;
URLFeed.prototype.getFeed = function () {
	return this.url;
};
URLFeed.prototype.setFeed = function (urlValue) {
	this.url = urlValue;
};

function TextFeed(_id, _type, _createdTime) {
	this.id 		 = _id;
	this.type 		 = _type;
	this.createdTime = _createdTime;
	Feed.call(this);
}

TextFeed.prototype = Object.create(Feed.prototype);
TextFeed.prototype.constructor = TextFeed;
TextFeed.prototype.text = undefined;
TextFeed.prototype.getFeed = function () {
	return this.text;
};
TextFeed.prototype.setFeed = function (textValue) {
	this.text = textValue;
};

var urlRegEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;