"use strict";

var ProfileClass = function (userId, name, age, phone, email, address) {
	this.userId = userId;
	this.name = name;
	this.age = age;
	this.phone = phone;
	this.email = email;
	this.address = address;
};

var profileModule = angular.module("profileModule", []);
profileModule.controller("ProfileController", ["$scope", function ($scope) {

	this.profileStore = [];
	$scope.usernameMinLen = 3;
	$scope.usernameMaxLen = 50;
	$scope.minAge = 0;
	$scope.maxAge = 100;
	$scope.phoneMinLen = 5;
	$scope.phoneMaxLen = 15;
	$scope.userIdCounter = 1;
	
	$scope.save = function (profile) {
		if (profile instanceof ProfileClass) {
            this.profileStore.push(profile);
		}
    };
    
    $scope.getCurrentProfile = function () {
		return profileStore.length > 0 ? profileStore[profileStore.length - 1]
										   : null;
    };
	
	$scope.getUserId = function () {
        return this.userIdCounter++;
    };
}]);