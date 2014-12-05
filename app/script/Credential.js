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

credentialModule.controller("LoginController", ["$scope", "$rootScope", "$location", "credentailService",
function ($scope, $rootScope, $location, credentailService) {

	$scope.name = "admin";
	$scope.password = "admin123";

	$scope.login = function () {
		$rootScope.error = "";

		if ($scope.name.length < credentailService.getUserNameMinLength()) {
			$rootScope.error = "Sorry, User name should atleast be "
			+ credentailService.getUserNameMinLength()
			+ " characters...";
			return;
		} else if ($scope.password.length < credentailService.getPasswordMinLength()) {
			$rootScope.error = "Sorry, Password should atleast be "
			+ credentailService.getPasswordMinLength()
			+ " characters...";
			return;
		}

		if ($scope.name !== credentailService.getUserName()) {
			$rootScope.error = "Sorry, Incorrect User name...";
			return;
		} else if ($scope.password !== credentailService.getPassword()) {
			$rootScope.error = "Sorry, Incorrect Password...";
			return;
		}

		$location.path("/mypage");
	};

	$scope.checkNameLength = function () {
		if (this.name.length > credentailService.getUserNameMaxLength()) {
			this.name = this.name.substring(0, credentailService.getUserNameMaxLength());
			$rootScope.error = "Sorry, User name cannot exceed 8 characters...";
		} else {
			$rootScope.error = "";
		}
	};
}]);
