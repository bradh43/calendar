<?php
    require 'db.write.php';
    header("Content-Type: application/json");

    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input'); 
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);
    $title = $json_obj['title'];
    $date_key = $json_obj['date_key'];
    $time = $json_obj['time'];
    $location = $json_obj['location'];
    //$endtime = null;

    //set to http only
    ini_set("session.cookie_httponly", 1);

    //start the session
    session_start();
    //check if the CSRF token is the same
    if(!hash_equals($_SESSION['token'], $json_obj['token'])){
        echo "no no  no...";
        die("Request forgery detected");
    } else {
        // make sure the user is logged in
        if(empty($_SESSION["username"])){
            include 'logout.php';
        } else {
            //get the username
            $username = $_SESSION['username'];

            //add the event to the sql data base
            $stmtinsert = $mysqli->prepare("INSERT into events (userid, event_title, date, start_time, location) values (?, ?, ?, ?, ?)");
            if(!$stmtinsert){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmtinsert->bind_param('sssss', $username, $title, $date_key, $time, $location);
            $stmtinsert->execute();
            $stmtinsert-> close();
        }
    }
?>