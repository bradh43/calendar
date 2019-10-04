<?php
    //set to http only
    ini_set("session.cookie_httponly", 1);
    session_start();

    require 'db.write.php';

    header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
    //Because you are posting the data via fetch(), php has to retrieve it elsewhere.
    $json_str = file_get_contents('php://input'); 
    //This will store the data into an associative array
    $json_obj = json_decode($json_str, true);

    // header("Location: http://google.com");
    if(empty($json_obj['firstname']) || empty($json_obj['lastname']) || empty($json_obj['username']) || empty($json_obj['email']) || empty($json_obj['password'])){
        echo json_encode(array(
            "success" => false,
            "message" => "Empty Data Present"
        ));
        exit;
    }else{
        if($json_obj['password'] != $json_obj['confirmedpass']){
            echo json_encode(array(
                "success" => false,
                "message" => "Passwords do not match"
            ));
            exit;
        }
        $firstname = (string) $json_obj['firstname'];
        $lastname = (string) $json_obj['lastname'];
        $email = (string) $json_obj['email'];
        $username = (string) $json_obj['username'];
        $temppass = password_hash($json_obj['password'], PASSWORD_BCRYPT);
        $_SESSION["username"] = $username;


        $safe_username = $mysqli->real_escape_string($_POST['username']);


        //check if the user already exists
        $stmt = $mysqli->prepare("SELECT count(*) from user where userid = '$safe_username'");
        if(!$stmt){
            printf("Query Prep Failed: %s\n", $mysqli->error);
            exit;
        }
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt-> close();

        if($count != 0){
            // session_destroy();
            // session_start();
            // $_SESSION["error-message"] = "User already exists";
            echo json_encode(array(
                "success" => false,
                "message" => "User already exists"
            ));
            exit;
        }
        else{ //else insert into users table new user and save their setting
            $stmtinsert = $mysqli->prepare("INSERT into user (first_name, last_name, email, userid, hashed_password) values (?, ?, ?, ?, ?)");
            if(!$stmtinsert){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmtinsert->bind_param('sssss', $firstname, $lastname, $email, $username, $temppass);
            $stmtinsert->execute();
            $stmtinsert-> close();

            $stmtinsert2 = $mysqli->prepare("INSERT into setting (userid, start_week_index, view_style, time_formate) values (?, ?, ?, ?)");
            if(!$stmtinsert2){
                printf("Query Prep Failed: %s\n", $mysqli->error);
                exit;
            }
            $stmtinsert2->bind_param('siii', $username, 1, 2, 1);
            $stmtinsert2->execute();
            $stmtinsert2-> close();
        }
         
        //log the user in
        $_SESSION['username'] = $username;
        $_SESSION['token'] = bin2hex(random_bytes(32));


        echo json_encode(array(
            "success" => true
        ));
        exit;
    }
?>