<?php
    require 'db.read.php';
    header("Content-Type: application/json");


   //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
   $json_str = file_get_contents('php://input'); 
   //This will store the data into an associative array
   $json_obj = json_decode($json_str, true);
   
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
        $stmt = $mysqli->prepare("SELECT  start_week_index, view_style, time_formate FROM setting WHERE userid=?");

        // Bind the parameter
        $user = $_SESSION['username']; //getting variable from input username
        $stmt->bind_param('s', $user);
        $stmt->execute();
    
        // Bind the results
        $stmt->bind_result($start_day_index, $view_index, $time_format_index);

        $stmt->fetch();
            $json_array = array(
                "start_week_index" => $start_day_index,
                "view_format" => $view_index,
                "time_format" => $time_format_index,
            );
        
           
        
        echo json_encode($json_array);
        
    }

?>