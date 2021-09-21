<?php 
include "connection.php";


$user_id = $_GET["id"];
$search_result ="%". $_GET["search_result"]."%";



$query = "Select id, first_name,last_name, address from users u where u.id <> ? AND (u.first_name LIKE ? OR u.last_name LIKE ?) ";
$obj = $con->prepare($query);
$obj->bind_param("iss", $user_id, $search_result,$search_result);
$obj->execute();

$results = $obj->get_result();

$users_arr = [];
while($users = $results->fetch_assoc()){
	$users_arr[] = $users;
}

$users_json = json_encode($users_arr);
echo $users_json;

?>