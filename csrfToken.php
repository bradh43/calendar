 <?php

    header("Content-Type: application/json");
    //set to http only
    ini_set("session.cookie_httponly", 1);
    session_start();
    // echo $_SESSION['token'];
    echo json_encode(array(
        "success" => true,
        "token" => $_SESSION['token']
    ));
    exit;
?> 