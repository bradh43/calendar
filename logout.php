<?php
    header("Content-Type: application/json");
    //http only
    ini_set("session.cookie_httponly", 1);

    //clear the session
    session_start();
    session_destroy();
    echo json_encode(array(
        "success" => true,
    ));
    //redirect the user to the login page
    die();
?>
