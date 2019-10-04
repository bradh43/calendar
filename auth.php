<?php
    // login_ajax.php
    require 'db.read.php';

    header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input'); 
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    // Check to see if the username and password are valid.
    $stmt = $mysqli->prepare("SELECT COUNT(*), userid, hashed_password FROM user WHERE userid=?");

    // Bind the parameter
    $user = $json_obj['username']; //getting variable from input username
    $stmt->bind_param('s', $user);
    
    $stmt->execute();

    // Bind the results
    $stmt->bind_result($cnt, $username, $pwd_hash);
    $stmt->fetch();

    $pwd_guess = $json_obj['password'];

    if(password_verify($pwd_guess, $pwd_hash) && $cnt == 1/*&& $username == $user*/){
        //http only
        ini_set("session.cookie_httponly", 1);
        session_start();
        $_SESSION['username'] = $username;
        $_SESSION['token'] = bin2hex(random_bytes(32));

        echo json_encode(array(
            "success" => true,
            "username" => $username
        ));
        exit;
    }else{
        echo json_encode(array(
            "success" => false,
            "message" => "Incorrect Username or Password"
        ));
        exit;
    }
?>