<?php 
include "connection.php";

$connection_id = $_GET["connection_id"];

// $name = $_POST["name"];
// $author = $_POST["author"];
// $published = $_POST["published"];

$is_pending = 2;


$query = "UPDATE connections SET is_pending = ? where id = ?";
$obj = $con->prepare($query);
$obj->bind_param("ii", $is_pending, $connection_id);
$obj->execute();

$response = [];
$response["success"] = 1;

$response_json = json_encode($response);
echo $response_json;

?>