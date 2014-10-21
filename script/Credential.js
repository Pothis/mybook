var CREDENTIAL = (function() {
	var userName = "admin";
	var password = "admin123";
	var userNameMinLength = 3;
	var userNameMaxLength = 8;
	var passwordMinLength = 6;
	
	return {
		getUserName: function() { 
			return userName;
		},
		getPassword: function() { 
			return password;
		},
		getUserNameMinLength: function() {
			return userNameMinLength;
		},
		getUserNameMaxLength: function() {
			return userNameMaxLength;
		},
		getPasswordMinLength: function() {
			return passwordMinLength;
		}
	};
})();