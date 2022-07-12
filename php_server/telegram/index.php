<?php
    $servername = "db";
    $username = "root";
    $password = "root";
    $date_base = "test";

    // Create connection
    $connect = new mysqli($servername, $username, $password, $date_base);

    
    
    if($_POST['type'] == 'render_request'){
        $telegram_id = $_POST["telegram_id"];
        $check_user = mysqli_query($connect, "SELECT `render_status` FROM `users` WHERE `telegram_id` = '$telegram_id'");
        $results = mysqli_fetch_row($check_user);
        echo $results[0];
        
    }elseif($_POST['type'] == 'registration'){
        $telegram_id = $_POST["telegram_id"];
        $user_token = $_POST["user_token"];
        $check_user = mysqli_query($connect, "SELECT `telegram_id` FROM `users` WHERE `telegram_id` = '$telegram_id'");
        if (mysqli_num_rows($check_user) > 0 ) {
            $check_user_conf = mysqli_query($connect, "SELECT `user_token` FROM `users` WHERE `telegram_id` = '$telegram_id'");
            $resultsss = mysqli_fetch_row($check_user_conf);
            echo json_encode([true, $resultsss[0]]);
            
           
           
        }else{
            mysqli_query($connect, "INSERT INTO `users` (`id`, `user_token`, `telegram_id`, `render_status`) VALUES (NULL, '$user_token', '$telegram_id', NULL)");
            echo json_encode([false, '']);
        
        
        
        }
        
        
    };
    
    
    
?>
