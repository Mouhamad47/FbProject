<?php 
include "connection.php";


$user_id = $_GET["id"];
// $search_result = $_GET["search_result"];
$blocked = 2;



$query = "Select u.id, u.first_name, u.last_name, u.address, u.gender  from users u, connections c where c.second_user_id = u.id AND c.first_user_id = ? AND c.blocked = ? AND u.id <> ?";
$obj = $con->prepare($query);
$obj->bind_param("iii", $user_id, $blocked, $user_id);
$obj->execute();

$results = $obj->get_result();

$users_arr = [];
while($users = $results->fetch_assoc()){
	$users_arr[] = $users;
}

$users_json = json_encode($users_arr);
echo $users_json;

?>