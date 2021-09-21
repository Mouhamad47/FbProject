<?php 

include "connection.php";

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$user_id = $_GET["id"];

$old_password         = $request->old_password;
$hashed_old_password  = hash('sha256', $old_password);
$new_password         = $request->new_password;
$hashed_new_password  = hash('sha256', $new_password); 
                     
$query1 = "Select password from users where id = ? ";
$stmt = $con->prepare($query1);
$stmt->bind_param('i', $user_id);
$stmt->execute();

$results = $stmt->get_result();
while($user = $results->fetch_assoc()){
	$user_arr[] = $user;
}
if($hashed_old_password == $user_arr[0]['password']){
    $query = "UPDATE users SET  password = ? where id = ?";
    $obj   = $con->prepare($query);
    $obj->bind_param("si", $hashed_new_password, $user_id);
    $obj->execute();
    $response = [];
    $response["success"] = 1;
    $response_json = json_encode($response);
    echo $response_json;
    http_response_code(200);
}
else{
    http_response_code(404);
}


