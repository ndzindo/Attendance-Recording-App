window.onload= function(){

    var username
    var password
    var button = document.getElementById("log")

    function login(dobar, podaci){
        if(dobar)
            window.location.replace("predmeti.html");
        else
            console.log(podaci);
    }

    
	button.onclick = function(){
        username = document.getElementById("username").value
        password = document.getElementById("password").value
        PoziviAjax.postLogin(username, password, login);
    }
	


}