<?php 
include "connection.php";

$connection_id = $_GET["id"];

// $name = $_POST["name"];
// $author = $_POST["author"];
// $published = $_POST["published"];
$blocked = 2;
$is_pending = 0;


$query = "UPDATE connections SET  blocked = ?, is_pending = ? where id = ?";
$obj = $con->prepare($query);
$obj->bind_param("iii", $blocked, $is_pending, $connection_id);
$obj->execute();

$response = [];
$response["success"] = 1;

$response_json = json_encode($response);
echo $response_json;

?>