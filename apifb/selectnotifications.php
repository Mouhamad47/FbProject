<?php 
include "connection.php";

$user_id  = $_GET["user_id"];

$query = "Select * from notifications where user_id = ?";
$obj = $con->prepare($query);
$obj->bind_param("i", $user_id);
$obj->execute();

$results = $obj->get_result();

$notifications_arr = [];
while($notifications = $results->fetch_assoc()){
	$notifications_arr[] = $notifications;
}

$notifications_json = json_encode($notifications_arr);
echo $notifications_json;

?>