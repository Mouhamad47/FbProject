<?php 
include "connection.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$first_name = $request->first_name;
$last_name  = $request->last_name;

$user_id = $_GET["id"];

$query = "UPDATE users SET  first_name = ?, last_name = ? where id = ?";
$obj = $con->prepare($query);
$obj->bind_param("ssi", $first_name, $last_name, $user_id);
$obj->execute();

$response = [];
$response["success"] = 1;

$response_json = json_encode($response);
echo $response_json;

?>