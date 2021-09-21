$(document).ready(function () {

    var $first_name = $('#first_name');
    var $last_name = $('#last_name');
    var $suemail = $('#suemail');
    var $supassword = $('#supassword');
    var $address = $('#address');
    var $gender = $('#gender');

    var $email = $('#email');
    var $password = $('#password');

   
    

    function clear() {
        document.getElementById("registration").reset();
    }
    function logIn(info) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/apifb/login.php',
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                window.location.href = './index.html';
                localStorage.setItem('id', data[0]['id']);
                localStorage.setItem('firstname', data[0]['first_name']);
                localStorage.setItem('lastname', data[0]['last_name']);
                localStorage.setItem('address',data[0]['address']);

            }
        })
       
    }



    $('#register').on('click', function (event) {
        event.preventDefault();
        var info = {
            first_name: $first_name.val(),
            last_name: $last_name.val(),
            email: $suemail.val(),
            password: $supassword.val(),
            address: $address.val(),
            gender: $gender.val()
        };
        console.log(info);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/apifb/register.php',
            data: JSON.stringify(info),
            dataType: "json",
            contentType: "application/json",
            success: function () {
                alert("You are registered");
                clear();
            }
        });

    });
    $('#login').on('click', function (event) {
        event.preventDefault();
        var info = {
            email: $email.val(),
            password: $password.val()
        };
        logIn(info);

    });

    


    



});