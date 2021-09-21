<?php 
include "connection.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$notibody = $request->notibody;
$user_id  = $_GET["user_id"];


$is_pending = 1;
$query = "INSERT INTO notifications (user_id, notibody) VALUES (?, ?)";
$obj = $con->prepare($query);
$obj->bind_param("is", $user_id, $notibody);
$obj->execute();
$id = $obj->insert_id;

$notifications = [];
$notifications["id"] = $id;
$notifications["user_id"] = $user_id;
$notifications["notibody"] = $notibody;


$article_json = json_encode($notifications);
echo $article_json;

?>