<?php
    require 'db.write.php';
    header("Content-Type: application/json");
    

    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input'); 
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    $start_day_index = intval($json_obj["start_day_index"]);
    $view_index = intval($json_obj["view_index"]);
    $time_format_index = intval($json_obj["time_format_index"]);
    //http only
    ini_set("session.cookie_httponly", 1);
    //start the session
    session_start();
    //check if the CSRF token is the same
    if(!hash_equals($_SESSION['token'], $json_obj['token'])){
        die("Request forgery detected");
    } else {
        // make sure the user is logged in
        if(empty($_SESSION["username"])){
            //user not logged in return null
            include 'logout.php';
        } else {
            $username = $_SESSION['username'];
            //query the sql data base
            //add the event to the sql data base
            $stmtupdate = $mysqli->prepare("UPDATE setting SET start_week_index=?, view_style=?, time_formate=? where userid=?");
            if(!$stmtupdate){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmtupdate->bind_param('iiis', $start_day_index, $view_index, $time_format_index, $username);
            $stmtupdate->execute();
            $stmtupdate-> close();
        }
   }
    
?>