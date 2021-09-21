$(document).ready(function () {
    var $first_user_id = localStorage.getItem("id");
    var $firstlastname = $('#firstlastname');
    var $address = $('#address');
    var $firstname_content = localStorage.getItem('firstname');
    var $lastname_content = localStorage.getItem('lastname');
    var $address_content = localStorage.getItem('address');
    $firstlastname.text($firstname_content + ' ' + $lastname_content);
    $address.text($address_content);
    $navfname = $('#navfname');
    $navfname.text($firstname_content);

    var $search_result = $('#searchresult');
    var $user_first_name = $('#userfirstname');
    var $user_last_name = $('#userlastname');
    var $old_password = $('#oldpassword');
    var $new_password = $('#newpassword');
    var $accept_your_friend_request = $firstname_content + " " + $lastname_content + " accepted your friend request";
    var $sent_you_a_friend_request = $firstname_content + " " + $lastname_content + " sent you a friend request";

    var number_of_friends = document.getElementById("number_of_friends");


    getAllFriendsRequests();
    getAllBlockedUsers();
    getAllPendingConnections();
    getAllNotifications();
    countFriends();


    $(document.body).on('click', '#addfriend', function () {
        var $second_user_id = $(this).data("id");
        sendFriendRequest($second_user_id);
        sendNotificationAddRequest($second_user_id);

    });
    $(document.body).on('click', '.accept-req', function () {
        var $connection_id = $(this).data("id");
        var $user_id = $(this).attr('id');
        var rem = $(this).closest('.request-details').remove();
        acceptFriendRequest($connection_id);
        sendNotificationAcceptRequest($user_id);


    });
    $(document.body).on('click', '.close-req', function () {
        var $connection_id = $(this).data("id");
        var rem = $(this).closest('.request-details').remove();
        declineRequest($connection_id);


    });
    $('#change').on('click', function (event) {
        event.preventDefault();
        changeUserFullName();

    });
    $('#changepass').on('click', function (event) {
        event.preventDefault();
        changePassword();

    });
    $('#searchbtn').on('click', function (event) {
        event.preventDefault();
        getAllUsers();
        clearForm3();

    });
    $('#logout').on('click', logOut);


    function clearForm() {
        document.getElementById("form1").reset();
    }
    function clearForm2() {
        document.getElementById("form2").reset();
    }
    function clearForm3() {
        document.getElementById("form3").reset();

    }

    function createUserProfile(id, firstname, last_name, address) {
        let row = document.getElementById("userrow");
        let div1 = document.createElement("div");
        div1.className = "col-lg-4 col-md-4 col-sm-6";
        let div2 = document.createElement("div");
        div2.className = "company_profile_info";
        let div3 = document.createElement("div");
        div3.className = "company-up-info";
        let img = document.createElement("img");
        img.src = "images/resources/profile.svg";
        let header1 = document.createElement("h3");
        header1.innerText = firstname + " " + last_name;
        let header2 = document.createElement("h4");
        header2.innerText = address;
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        let button1 = document.createElement("button");
        button1.id = "addfriend";
        button1.dataset.id = id;
        button1.className = "btn follow";
        button1.innerText = "Add Friend";
        li.appendChild(button1);
        ul.appendChild(li);
        div3.appendChild(img);
        div3.appendChild(header1);
        div3.appendChild(header2);
        div3.appendChild(ul);
        div2.appendChild(div3);

        div1.appendChild(div2);
        row.appendChild(div1);


    }
    function createPendingTableRow(firstname, lastname, address) {
        let pendingtbody = document.getElementById("pendingtbody");
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = firstname;
        let td2 = document.createElement("td");
        td2.innerText = lastname;
        let td3 = document.createElement("td");
        td3.innerText = address;
        let td4 = document.createElement("td");
        td4.innerText = "Pending";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        pendingtbody.appendChild(tr);

    }
    function createBlockedTableRow(firstname, lastname, address) {
        let blockedbody = document.getElementById("blockedbody");
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerText = firstname;
        let td2 = document.createElement("td");
        td2.innerText = lastname;
        let td3 = document.createElement("td");
        td3.innerText = address;
        let td4 = document.createElement("td");
        td4.innerText = "Blocked";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        blockedbody.appendChild(tr);

    }
    function createNotificationRow(body) {
        let div1 = document.getElementById("notifications-list");
        let div2 = document.createElement('div');
        div2.className = "notfication-details";
        let div3 = document.createElement('div');
        div3.className = "noty-user-img";
        let img = document.createElement("img");
        img.src = "images/resources/profile.svg";
        div3.appendChild(img);

        let div4 = document.createElement("div");
        div4.className = "notification-info";
        let header1 = document.createElement("h3");
        header1.innerText = body;
        div4.appendChild(header1);

        div2.appendChild(div3);
        div2.appendChild(div4);

        div1.appendChild(div2);


    }
    function createRequestRow(id, firstname, lastname, address, connection_id) {
        let div1 = document.getElementById("requests-list");
        let div2 = document.createElement("div");
        div2.className = "request-details";

        let div3 = document.createElement("div");
        div3.className = "noty-user-img";
        let image = document.createElement("img");
        image.src = "images/resources/profile.svg";
        div3.appendChild(image);

        let div4 = document.createElement("div");
        div4.className = "request-info";
        let header1 = document.createElement("h3");
        header1.innerText = firstname + " " + lastname;
        let span = document.createElement("span");
        span.innerText = address;
        div4.appendChild(header1);
        div4.appendChild(span);

        let div5 = document.createElement("div");
        div5.className = "accept-feat";
        let ul = document.createElement("ul");
        let li1 = document.createElement("li");
        let button1 = document.createElement("button");
        button1.className = "accept-req";
        button1.innerText = "Accept";
        button1.id = id;
        button1.dataset.id = connection_id;
        li1.appendChild(button1);
        let li2 = document.createElement("li");
        let button2 = document.createElement("button");
        button2.className = "close-req";
        button2.dataset.id = connection_id;
        let i1 = document.createElement("i");
        i1.className = "la la-close";
        button2.appendChild(i1);
        li2.appendChild(button2);
        ul.appendChild(li1);
        ul.appendChild(li2);
        div5.appendChild(ul);

        div2.appendChild(div3);
        div2.appendChild(div4);
        div2.appendChild(div5);

        div1.appendChild(div2);




    }




    async function fetchAllUsers(search_result) {
        const response = await fetch('http://localhost:8080/apifb/selectallusers.php?id=' + $first_user_id + "&search_result=" + search_result);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function createConnection(dataform) {
        try {
            result = await $.ajax({
                type: "POST",
                url: "http://localhost:8080/apifb/createconnection.php?first_user_id=" + $first_user_id,
                data: dataform,
                dataType: "json",
                contentType: "application/json",

            })
        }
        catch (error) {
            console.log(error);
        }
    }
    async function createNotificationAccept($user_id, dataform) {
        try {
            result = await $.ajax({
                type: "POST",
                url: "http://localhost:8080/apifb/createnotification.php?user_id=" + $user_id,
                data: dataform,
                dataType: "json",
                contentType: "application/json",

            })
        }
        catch (error) {
            console.log(error);
        }
    }
    async function createNotificationSendFriendRequest($user_id, dataform) {
        try {
            result = await $.ajax({
                type: "POST",
                url: "http://localhost:8080/apifb/createnotification.php?user_id=" + $user_id,
                data: dataform,
                dataType: "json",
                contentType: "application/json",

            })
        }
        catch (error) {
            console.log(error);
        }
    }
    async function updatePassword(dataform) {
        try {
            result = await $.ajax({
                type: "POST",
                url: "http://localhost:8080/apifb/updatepassword.php?id=" + $first_user_id,
                data: dataform,
                dataType: "json",
                contentType: "application/json",


            });
        }
        catch (error) {
            console.log(error);
        }
    }
    async function fetchPendingConnections() {
        const response = await fetch('http://localhost:8080/apifb/selectpendingconnetions.php?id=' + $first_user_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function fetchNotifications() {
        const response = await fetch('http://localhost:8080/apifb/selectnotifications.php?user_id=' + $first_user_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function fetchAllFriendsRequests() {
        const response = await fetch('http://localhost:8080/apifb/selectallfriendrequests.php?id=' + $first_user_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function fetchAllBlockedUsers() {
        const response = await fetch('http://localhost:8080/apifb/selectallblockedusers.php?id=' + $first_user_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function fetchNumberOfFriends() {
        const response = await fetch('http://localhost:8080/apifb/countfriends.php?id=' + $first_user_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function fetchAcceptFriendRequest($connection_id) {
        const response = await fetch('http://localhost:8080/apifb/acceptfriendrequest.php?connection_id=' + $connection_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function rejectFriendRequest($connection_id) {
        const response = await fetch('http://localhost:8080/apifb/unfriend.php?id=' + $connection_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }

    async function updateUserFullName(dataform) {
        try {
            result = await $.ajax({
                type: "POST",
                url: "http://localhost:8080/apifb/updateprofilenames.php?id=" + $first_user_id,
                data: dataform,
                dataType: "json",
                contentType: "application/json",

            })
        }
        catch (error) {
            console.log(error);
        }
    }

    function getAllUsers() {

        search_result = $search_result.val()
        console.log("SEARCH RESULT", search_result);
        fetchAllUsers(search_result).then(results => {
            console.log(results);
            for (i = 0; i < results.length; i++) {
                createUserProfile(results[i]['id'], results[i]['first_name'], results[i]['last_name'], results[i]['address']);
            }
        })
    }
    function sendFriendRequest($second_user_id) {
        var info = {
            second_user_id: $second_user_id,
        };
        data = JSON.stringify(info);
        createConnection(data).then(results => {
            alert("Request Was Sent");
        });

    }
    function sendNotificationAcceptRequest($user_id) {
        var info = {
            notibody: $accept_your_friend_request
        };
        data = JSON.stringify(info);
        createNotificationAccept($user_id, data).then(results => {

        });

    }
    function sendNotificationAddRequest($user_id) {
        var info = {
            notibody: $sent_you_a_friend_request
        };
        data = JSON.stringify(info);
        createNotificationSendFriendRequest($user_id, data).then(results => {
            console.log("notification sent");
        })

    }
    function getAllPendingConnections() {
        fetchPendingConnections().then(results => {
            console.log(results);
            for (i = 0; i < results.length; i++) {
                createPendingTableRow(results[i]['first_name'], results[i]['last_name'], results[i]['address']);
            }
        })
    }
    function getAllFriendsRequests() {
        fetchAllFriendsRequests().then(results => {
            console.log(results);
            for (i = 0; i < results.length; i++) {
                createRequestRow(results[i]['id'], results[i]['first_name'], results[i]['last_name'], results[i]['address'], results[i]['connection_id']);
            }

        })
    }
    function getAllBlockedUsers() {
        fetchAllBlockedUsers().then(results => {
            console.log("BLOCKED USERS", results);
            for (i = 0; i < results.length; i++) {
                createBlockedTableRow(results[i]['first_name'], results[i]['last_name'], results[i]['address']);
            }

        })
    }
    function changeUserFullName() {
        var info = {
            first_name: $user_first_name.val(),
            last_name: $user_last_name.val()
        };
        data = JSON.stringify(info);
        updateUserFullName(data).then(results => {
            alert("The Update was successfull");
            clearForm();


        });
        console.log(info);

    }
    function changePassword() {
        var info = {
            old_password: $old_password.val(),
            new_password: $new_password.val()
        };
        data = JSON.stringify(info);
        updatePassword(data).then(results => {
            alert("Your Password has been changed");
            clearForm2();
        })

    }
    function getAllNotifications() {
        fetchNotifications().then(results => {
            console.log(results);
            for (i = 0; i < results.length; i++) {
                createNotificationRow(results[i]['notibody']);
            }

        });
    }
    function countFriends() {
        fetchNumberOfFriends().then(results => {
            console.log(results);
            number_of_friends.innerText = results[0]['number_of_friends'];


        })
    }

    function acceptFriendRequest($connection_id) {
        fetchAcceptFriendRequest($connection_id).then(results => {
            alert("Request Accepted");
        })
    }
    function declineRequest($connection_id) {
        rejectFriendRequest($connection_id).then(results => {
            alert("Request Rejected");
        });
    }
    function logOut() {
        localStorage.clear();
        window.location.href = './sign-in.html';
    }










});