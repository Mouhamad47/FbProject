<?php

header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE ");
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");



$server = "localhost";
$username = "root";
$password = "";
$dbname = "fbdatabase";

$con = new mysqli($server, $username, $password, $dbname);

if ($con->connect_error) {
    die("Failed");
}
