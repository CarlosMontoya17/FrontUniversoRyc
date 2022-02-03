function validateLogin(){
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	if(username.length >4) {
		if(password.length>2){
			document.getElementById("usernameDiv").style.display = 'none';
			document.getElementById("passDiv").style.display = 'none';
	   		return true;
	  	}else{
	  		document.getElementById("usernameDiv").style.display = 'none';
	  		document.getElementById("passDiv").style.display = 'block';
	  		return false;
	  	}
	} else {
		document.getElementById("passDiv").style.display = 'none';
		document.getElementById("usernameDiv").style.display = 'block';
		return false;
	}

}