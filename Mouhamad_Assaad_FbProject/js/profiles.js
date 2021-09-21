$(document).ready(function () {
    var $id = localStorage.getItem("id");
    var $firstname_content = localStorage.getItem('firstname');
    $navfname = $('#navfname');
    $navfname.text($firstname_content);


    getAllFriends();


    $(document.body).on('click', '#unfriend', function () {
        var $connection_id = $(this).data("id");
        var rem = $(this).closest('.col-lg-3').remove();
        unFriend($connection_id);
        // console.log("CLICKED");

    });

    $(document.body).on('click', '#block', function () {
        var $connection_id = $(this).data("id");
        var rem = $(this).closest('.col-lg-3').remove();
        blockFriend($connection_id);
        // console.log("CLICKED");

    });
    $('#logout').on('click', logOut);


    function createUserProfile(id, connection_id, first_name, last_name, address) {
        let row = document.getElementById("userrow");
        let div1 = document.createElement("div");
        div1.className = "col-lg-3 col-md-4 col-sm-6";
        let div2 = document.createElement("div");
        div2.className = "company_profile_info";
        let div3 = document.createElement("div");
        div3.className = "company-up-info";
        let img = document.createElement("img");
        img.src = "images/resources/profile.svg";
        let header1 = document.createElement("h3");
        header1.innerText = first_name + " " + last_name;
        let header2 = document.createElement("h4");
        header2.innerText = address;
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        let button1 = document.createElement("button");
        button1.id = "unfriend";
        button1.className = "btn btn-danger";
        button1.innerText = "Unfriend";
        button1.dataset.id = connection_id;
        li.appendChild(button1);
        ul.appendChild(li);
        div3.appendChild(img);
        div3.appendChild(header1);
        div3.appendChild(header2);
        div3.appendChild(ul);
        let button2 = document.createElement("button");
        button2.id = "block";
        button2.className = "btn view-more-pro block";
        button2.innerText = "Block User";
        button2.dataset.id = connection_id;
        div2.appendChild(div3);
        div2.appendChild(button2);
        div1.appendChild(div2);
        row.appendChild(div1);






    }
    // createUserProfile();

    async function fetchAllFriends() {
        const response = await fetch('http://localhost:8080/apifb/selectallfriends.php?id=' + $id);
        // const response = await fetch('http://localhost:8080/apifb/selectallusers.php?id=' + $id+ '&search_result ='+ $search_result );
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function removeFriends($connection_id) {
        const response = await fetch('http://localhost:8080/apifb/unfriend.php?id=' + $connection_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }
    async function blockConnections($connection_id) {
        const response = await fetch('http://localhost:8080/apifb/blockconnection.php?id=' + $connection_id);
        if (!response.ok) {
            const message = "An error Occured";
            throw new Error(message);
        }
        const results = await response.json();
        return results;
    }

    function getAllFriends() {
        fetchAllFriends().then(results => {
            console.log("Friends", results);
            for (i = 0; i < results.length; i++) {
                createUserProfile(results[i]['id'], results[i]['connection_id'], results[i]['first_name'], results[i]['last_name'], results[i]['address']);
            }

        })

    }
    function unFriend($connection_id) {
        removeFriends($connection_id).then(results => {
            alert("You have Successfully remove this friend");
        })
    }
    function blockFriend($connection_id) {
        blockConnections($connection_id).then(results => {
            alert("You have Successfully blocked this user");
        })
    }
    function logOut() {
        localStorage.clear();
        window.location.href = './sign-in.html';
    }


    
});