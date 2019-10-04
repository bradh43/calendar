<?php

//logging into user that can insert and update
$host = "localhost";
$dbusername = "account";
$dbpassword = "accountpass";
$dbname = "calendar";

$mysqli = new mysqli($host, $dbusername, $dbpassword, $dbname);

if($mysqli->connect_errno){
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}