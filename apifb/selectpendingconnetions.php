<?php 
include "connection.php";

$user_id = $_GET["id"];
$blocked = 1;
$is_pending = 1;


$query = "Select u.id, u.first_name, u.last_name, u.address, u.gender , c.id as connection_id from users u, connections c where c.second_user_id = u.id AND c.first_user_id = ? AND c.blocked = ? AND u.id <> ? AND c.is_pending = ? ";
$obj = $con->prepare($query);
$obj->bind_param("iiii", $user_id, $blocked, $user_id, $is_pending);
// $obj->bind_param("ii", $user_id, $user_id);
$obj->execute();

$results = $obj->get_result();

$users_arr = [];
while($users = $results->fetch_assoc()){
	$users_arr[] = $users;
}

$users_json = json_encode($users_arr);
echo $users_json;

?>