<?php 
include "connection.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$second_user_id = $request->second_user_id;
$first_user_id  = $_GET["first_user_id"];


$is_pending = 1;
$blocked = 1;
$query = "INSERT INTO connections (first_user_id, second_user_id, is_pending, blocked) VALUES (?, ?, ?, ?)";
$obj = $con->prepare($query);
$obj->bind_param("iiii", $first_user_id, $second_user_id, $is_pending, $blocked);
$obj->execute();
$id = $obj->insert_id;

$friend_request = [];
$friend_request["id"] = $id;
$friend_request["first_user_id"] = $first_user_id;
$friend_request["second_user_id"] = $second_user_id;
$friend_request["is_pending"] = $is_pending;
$friend_request["blocked"] = $blocked;


$article_json = json_encode($friend_request);
echo $article_json;

?>