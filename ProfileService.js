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
	
	return {
		saveProfile: function (profile) {
			if (profile instanceof ProfileClass) {
				this.profileStore.push(profile);
			}
		}
	};
})(ProfileClass);