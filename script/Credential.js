"use strict";
var credentialModule = angular.module("credential", []);

credentialModule.factory("credentailService", function () {
	var userName = "admin",
	    password = "admin123",
	    userNameMinLength = 3,
	    userNameMaxLength = 8,
	    passwordMinLength = 6;
	
	return {
		getUserName: function () {
			return userName;
		},
		getPassword: function () {
			return password;
		},
		getUserNameMinLength: function () {
			return userNameMinLength;
		},
		getUserNameMaxLength: function () {
			return userNameMaxLength;
		},
		getPasswordMinLength: function () {
			return passwordMinLength;
		}
	};
});

function checkNameLength(name) {
	if (name.value.length > CREDENTIAL.getUserNameMaxLength()) {
		name.value = name.value.substring(0, CREDENTIAL.getUserNameMaxLength());
		document.getElementById('error').innerHTML = "Sorry, User name cannot exceed 8 characters...";
	} else {
		document.getElementById('error').innerHTML = "";
	}
}

function login() {
	document.getElementById('error').innerHTML = "";
	
	var name 	 = document.getElementById('name').value, 
		password = document.getElementById('password').value;
		
	if (name.length < CREDENTIAL.getUserNameMinLength()) {
		document.getElementById('error').innerHTML = "Sorry, User name should atleast be " 
													 + CREDENTIAL.getUserNameMinLength() 
													 + " characters...";
		return;
	} else if (password.length < CREDENTIAL.getPasswordMinLength()) {
		document.getElementById('error').innerHTML = "Sorry, Password should atleast be " 
													 + CREDENTIAL.getPasswordMinLength() 
													 + " characters...";
		return;
	}
	
	if (name != CREDENTIAL.getUserName()) {
		document.getElementById('error').innerHTML = "Sorry, Incorrect User name...";
		return;
	} else if (password != CREDENTIAL.getPassword()) {
		document.getElementById('error').innerHTML = "Sorry, Incorrect Password...";
		return;
	}
	window.location = "mypage.html";
}