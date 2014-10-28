"use strict";
var ProfileClass = function (userId, name, age, phone, email, address) {
	this.userId = userId;
	this.name = name;
	this.age = age;
	this.phone = phone;
	this.email = email;
	this.address = address;
};

var PROFILESERVICE = (function(ProfileClass) {

	var profileStore = [];
	var usernameMinLen = 3;
	var usernameMaxLen = 50;
	var minAge = 0;
	var maxAge = 100;
	var phoneMinLen = 5;
	var phoneMaxLen = 15;
	var userIdCounter = 1;
	return {
		save: function (profile) {
			if (profile instanceof ProfileClass) {
				profileStore.push(profile);
			}
		},
		getCurrentProfile: function () {
			return profileStore.length > 0 ? profileStore[profileStore.length - 1]
										   : null;
		},
		getUsernameMinLen: function () {
			return usernameMinLen;
		},
		getUsernameMaxLen: function () {
			return usernameMaxLen;
		},
		getMinAge: function() {
			return minAge;
		},
		getMaxAge: function() {
			return maxAge;
		},
		getPhoneMinLen: function () {
			return phoneMinLen;
		},
		getPhoneMaxLen: function () {
			return phoneMaxLen;
		},
		getUserId: function() {
			return userIdCounter++;
		}
	};
})(ProfileClass);