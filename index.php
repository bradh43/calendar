<!DOCTYPE html>
<!--
Brad Hodkinson
Pratyay Bishnupuri
03/13/19
CSE 330
Module 5 Calendar
-->

<html lang="en">
<head>
    <!-- Set up settings -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Calendar">
    <meta name="keywords" content="Calendar">
    <meta name="author" content="Brad Hodkinson, Pratyay Bishnupuri">
    <!-- Link the icon, javascript and css -->
    <link rel="shortcut icon" type="image/png" href="./assets/icons/calendar-1.png">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link rel="stylesheet" href="calendar.css">
    <script src="calendar.js"></script>
    <link rel="stylesheet" href="login.css">
    <script src="login.js"></script>
    <title>Calendar</title>
</head>
<body id="calendar-index">
    
    <?php 

    session_start();
    if(!empty($_SESSION["username"])){
        include("calendar.php");
    } else {
        include("login.php");
    }
    ?>
</body>

</html>



