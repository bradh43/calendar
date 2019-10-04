<?php
    require 'db.read.php';
    header("Content-Type: application/json");
    

    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input'); 
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);
    //get the date key to query for the event
    $date_key = (string)$json_obj["date_key"];
    //http only
    ini_set("session.cookie_httponly", 1);
    //start the session
    session_start();

    // make sure the user is logged in
    if(empty($_SESSION["username"])){
        //user not logged in return null
        include 'logout.php';
    } else {
        //query the sql data base
        $stmt = $mysqli->prepare("SELECT event_title, date, start_time, location FROM events WHERE userid=? and date=?");

        // Bind the parameter
        $user = $_SESSION['username']; //getting variable from input username
        $stmt->bind_param('ss', $user, $date_key);
        $stmt->execute();
    
        // Bind the results
        $stmt->bind_result($title, $date, $time, $location);
        $json_array = array();

        while($stmt->fetch()){
            $event_list = array(
                "event_title" => $title,
                "date" => $date,
                "starttime" => $time,
                "location" => $location
            );
        
            array_push($json_array, $event_list);
        }
        echo json_encode($json_array);
        
    }
    
?>