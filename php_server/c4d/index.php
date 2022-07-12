<?php
    $servername = "db";
    $username = "root";
    $password = "5e4ZKbGTKUu7m6wNSBH9UZSZbPA8gRCeTS";
    $date_base = "test";

    // Create connection
    $connect = new mysqli($servername, $username, $password, $date_base);

    // Check connection
    $content = file_get_contents("php://input");
    $a = json_decode($content, true);

    if($a['type'] == 'user_request'){
        $user_token = $a["user_token"];

        $check_user = mysqli_query($connect, "SELECT `user_token` FROM `users` WHERE `user_token` = '$user_token'");

        if (mysqli_num_rows($check_user) > 0 ) {
           echo "true";
        } else{
            echo "false";
        };

    }elseif($a['type'] == 'render_status'){
        $user_token = $a["user_token"];
        $render_information = json_encode($a["render_information"]);

        $check_user = mysqli_query($connect, "SELECT `user_token` FROM `users` WHERE `user_token` = '$user_token'");

        if (mysqli_num_rows($check_user) > 0 ) {
           mysqli_query($connect, "UPDATE users SET render_status= '$render_information' WHERE `user_token` = '$user_token'");


        } else{
            echo "false";

        };

    }
    
        


?>
