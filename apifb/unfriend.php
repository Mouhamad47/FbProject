<?php 
include "connection.php";

$connection_id = $_GET["id"];

$query = "DELETE from connections where id = ?";
$obj = $con->prepare($query);
$obj->bind_param("i", $connection_id);
$obj->execute();

$response = [];
$response["success"] = 1;

$response_json = json_encode($response);
echo $response_json;

?>