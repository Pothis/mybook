function checkNameLength(name) {
	if (name.value.length > PROFILESERVICE.getUsernameMaxLen()) {
		name.value = name.value.substring(0, PROFILESERVICE.getUsernameMaxLen());
		document.getElementById('error').innerHTML = "Sorry, User name cannot exceed " +
													 PROFILESERVICE.getUsernameMaxLen() +
													 " characters...";
	} else {
		document.getElementById('error').innerHTML = "";
	}
}

function logout() {
	cleanPrevError();
	window.location.replace("login.html");
}

function addFeed() {

	cleanPrevError();
	var feedValue = document.getElementById("feed").value;
	if (feedValue.length == 0) {
		document.getElementById('error').innerHTML = "Please enter URL or Text in the feed box...";
		return;
	}
	
	var regex = new RegExp(urlRegEx); // from Feed.js
	var newFeed;
	if (feedValue.match(regex) ) {
		newFeed = new URLFeed(FEEDSERVICE.getFeedId(), 'URL', getTime());
	} else {
		newFeed = new TextFeed(FEEDSERVICE.getFeedId(), 'Text', getTime());
	}
	newFeed.setFeed(feedValue);
	FEEDSERVICE.createFeed(newFeed);
	displayFeeds();
	document.getElementById("feed").value = "";
}

// this method will render the feed objects in UI
function displayFeeds() {
	cleanPrevError();
	document.getElementById("lblFeed").className = "selectedItem";
	document.getElementById('lblProfile').className = "unSelectedItem";
	document.getElementById('post').style.display = "block";
	document.getElementById('feeds').style.display = "block";
	document.getElementById('profile').style.display = "none";
	
	var myNode = document.getElementById("feeds");
	while (myNode.firstChild) {
		myNode.removeChild(myNode.firstChild);
	}

	var feedContent = "";
	var feedsList = FEEDSERVICE.getFeeds();
	for (var i = feedsList.length - 1; i >= 0; i--) {

		if (feedsList[i].getType() == "URL") {
			feedContent += "<br><div class='urlFeed' ><table width='100%' height='100%'><tr height='70%'><td width='13%'><img name='feedImg' src='resource/profileimg.jpg' alt='Profile Image' height='60' width='70' /></td><td width='50%' style='word-wrap: break-word;'><a href='" + feedsList[i].getFeed() + "' target='_blank' >" + feedsList[i].getFeed() + "</a>";
		} else {
			feedContent += "<br><div class='textFeed' ><table width='100%' height='100%'><tr height='70%'><td width='13%'><img name='feedImg' src='resource/profileimg.jpg' alt='Profile Image' height='60' width='70' /></td><td width='50%' style='word-wrap: break-word;'><label>" + feedsList[i].getFeed() + "</label>";
		}
		feedContent += "</td><td width='25%'><label style='position: static;'>" + feedsList[i].getCreatedTime() + "</label></td><td width='10%'><b><label id='" + feedsList[i].getId() + "' onclick='deleteFeed(this.id);' onmouseover=\"document.getElementById('" + feedsList[i].getId() + "').style.color='red'\" onmouseout=\"document.getElementById('" + feedsList[i].getId() + "').style.color='black'\">X</label></b></td></tr></table></div>";
	}
	
	var newDiv = document.createElement("div");
	newDiv.innerHTML = feedContent;
	document.getElementById("feeds").appendChild(newDiv); 
	
	var feedImages = document.getElementsByName("feedImg");
	if (feedImages != null) {
		for (var i = 0, len = feedImages.length; i < len; i++) {
			feedImages[i].src = imgsrc;
		}
	}
}

function displayProfile() {
	cleanPrevError();
	document.getElementById("lblProfile").className = "selectedItem";
	document.getElementById('lblFeed').className = "unSelectedItem";
	document.getElementById('post').style.display = "none";
	document.getElementById('feeds').style.display = "none";
	document.getElementById('profile').style.display = "inline";
	
	var currentProfile = PROFILESERVICE.getCurrentProfile();
	if (currentProfile != null) {
		document.getElementById('name').value    = currentProfile.name;
		document.getElementById('age').value     = currentProfile.age;
		document.getElementById('phone').value   = currentProfile.phone;
		document.getElementById('email').value   = currentProfile.email;
		document.getElementById('address').value = currentProfile.address;
	}
}

function getTime() {
	var time = new Date();
	var timeString = time.toLocaleDateString() + " " + time.toLocaleTimeString();
	timeString = timeString.slice(0, timeString.lastIndexOf(":")) + 
				 timeString.slice(timeString.lastIndexOf(" "), timeString.length).toLowerCase()
	return timeString;
}

function deleteFeed(id) {
	FEEDSERVICE.deleteFeed(id);
	displayFeeds();
}

function saveProfile() {
	if(validateProfile()) {
		var name = document.getElementById('name').value;
		var age  = document.getElementById('age').value;
		var phone = document.getElementById('phone').value;
		var email = document.getElementById('email').value;
		var address = document.getElementById('address').value;
		
		var profile = new ProfileClass( PROFILESERVICE.getUserId(), 
										name,
										age,
										phone,
										email,
										address );
		PROFILESERVICE.save(profile);
		document.getElementById('error').innerHTML = "Profile saved successfully...";
		
		showImage();
	}
}

function validateProfile() {

	cleanPrevError();
	
	var name = document.getElementById('name').value;
	var age  = document.getElementById('age').value;
	var phone = document.getElementById('phone').value;
	var email = document.getElementById('email').value;
	var address = document.getElementById('address').value;
	
	var regex = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
	
	if (name.length == 0) {
		document.getElementById('error').innerHTML = "Sorry, User name cannot be empty...";
		return false;
	} else if (name.length > PROFILESERVICE.getUsernameMaxLen()) {
		document.getElementById('error').innerHTML = "Sorry, User name cannot exceed " +  
													PROFILESERVICE.getUsernameMaxLen() + 
													" characters...";
		return false;
	} else if (name.length < PROFILESERVICE.getUsernameMinLen()) {
		document.getElementById('error').innerHTML = "Sorry, User name should atleast be " +  
													PROFILESERVICE.getUsernameMinLen() + 
													" characters...";
		return false;
	} if (age.length == 0) {
		document.getElementById('error').innerHTML = "Sorry, Age cannot be empty...";
		return false;
	} else if (isNaN(age) || age < PROFILESERVICE.getMinAge() || age > PROFILESERVICE.getMaxAge()) {
		document.getElementById('error').innerHTML = "Sorry, Age should be a number between " +
													 PROFILESERVICE.getMinAge() + " and " +
													 PROFILESERVICE.getMaxAge() + "...";
		return false;
	} else if (isNaN(phone) || 
			   phone.length < PROFILESERVICE.getPhoneMinLen() || 
			   phone.length > PROFILESERVICE.getPhoneMaxLen()) {
		document.getElementById('error').innerHTML = "Sorry, Phone number should be numbers and between " +  
													PROFILESERVICE.getPhoneMinLen() + " - " +
													PROFILESERVICE.getPhoneMaxLen() + " digits...";
		return false;
	}  else if (email.length == 0) {
		document.getElementById('error').innerHTML = "Sorry, Email address cannot be empty...";
		return false;
	} else if (!email.match(regex)) {
		document.getElementById('error').innerHTML = "Sorry, Invalid Email address...";
		return false;
	}
	return true;
}

function checkForSave() {
	if (document.getElementById('name').value.length > 0 &&
		document.getElementById('age').value.length > 0 &&
		document.getElementById('phone').value.length > 0 &&
		document.getElementById('email').value.length > 0) {
			document.getElementById('save').disabled = false;
	} else {
		document.getElementById('save').disabled = true;
	}
}

function cleanPrevError() {
	document.getElementById('error').innerHTML = "";
}

var imgsrc = "";
function showImage() {
	var img = document.getElementById("profileimg");
	var feedImage = document.getElementById("feedImg");
	var input = document.getElementById("profilePicture");
	if (input.value.length > 0) {
		var fReader = new FileReader();
		fReader.readAsDataURL(input.files[0]);
		fReader.onloadend = function(event){
			img.src = event.target.result;
			imgsrc = event.target.result;
		}
	} else {
		img.src = "";
		imgsrc = "";
	}
}