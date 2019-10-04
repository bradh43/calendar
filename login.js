

var switch_flag = true;
window.onload = function(){
    document.getElementById("login-button").addEventListener('click', function () {
        if(switch_flag){
            console.log("login");
            
            //checking if user exists
            const username = document.getElementById("username").value; // Get the username from the form
            const password = document.getElementById("password").value; // Get the password from the form

            // Make a URL-encoded string for passing POST data:
            const data = { 'username': username, 'password': password };

            fetch("auth.php", {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { 'content-type': 'application/json' }
                })
                .then(response => response.json())
                .then(response => {
                    
                    setTimeout("location.reload(true);",250);
                })
                .catch(error => console.error('Error:',error));
            
        } else {
            
            //get user info from forms
            const username = document.getElementById("username").value; // Get the username from the form
            const password = document.getElementById("password").value; // Get the password from the form
            const firstname = document.getElementById("first-name").value;
            const lastname = document.getElementById("last-name").value;
            const email = document.getElementById("email").value;
            const confirmPass = document.getElementById("confirm-password").value;

            // Make a URL-encoded string for passing POST data:
            let info = { 'username': username, 'password': password, 'firstname': firstname, 'lastname': lastname, 'email': email, 'confirmedpass': confirmPass };
            console.log("create account");
            fetch("createAccount.php", {
                    method: 'POST',
                    body: JSON.stringify(info),
                    headers: { 'content-type': 'application/json' }
                })
                .then(response => response.text())
                .then(response => {
                    setTimeout("location.reload(true);",250);
                })
                .catch(error => console.error('Error:',error));
        }
    });



    document.getElementById("new-user").addEventListener('click', function () {
        let create_account_element = document.getElementsByClassName("create-account");        
        
        switch_flag = !switch_flag;
        if(switch_flag){ 
            console.log("switch flag is true");
            document.getElementById("login-button").textContent = "Log In";
            document.getElementById("login-question").textContent = "New User?";                 
            document.getElementById("new-user").textContent = "Create Account";           
            for(let i=0; i< create_account_element.length; i++){
                create_account_element[i].style.display = "none";
            }
        } else {
            console.log("switch flag is false");
            document.getElementById("login-button").textContent = "Create Account"; 
            document.getElementById("login-question").textContent = "Already have account?";                 
            document.getElementById("new-user").textContent = "Login";                 

            for(let i=0; i< create_account_element.length; i++){                
                create_account_element[i].style.display = "block";
            }

        }
    });


    document.getElementById("password").addEventListener('keyup', function(event){
        if(event.keyCode === 13){
            console.log("enter");
            event.preventDefault();
            document.getElementById("login-button").click();
            
        }
    });

    
    
}
