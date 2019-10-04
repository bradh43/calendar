<?php

//logging into user that can only read data
$host = "localhost";
$dbusername = "readonly";
$dbpassword = "readpass";
$dbname = "calendar";

$mysqli = new mysqli($host, $dbusername, $dbpassword, $dbname);

if($mysqli->connect_errno){
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}