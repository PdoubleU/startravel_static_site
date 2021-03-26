<?php
	$to = 'piotrwitasik1988@gmail.com';
	$msg_details = "Otrzymałeś nową wiadomość poprzez stronę Star Cab:\n".
					$_POST['fname']."\n".$_POST['email']."\n".$_POST['message']."\n";
	$subject = "Star Cab - powiadomienie!";
	$header = "From:". $_POST['email'] ."\nContent-Type:".
					' text/plain;charset="UTF-8"'.
					"\nContent-Transfer-Encoding: 8bit";

	$fname = $_POST['fname'];
	$email = $_POST['email'];
	$datetime = date('Y-m-d H:i:s');
	$message = $_POST['message'];
	$document_root = $_SERVER['DOCUMENT_ROOT'];
	$output = $fname. "\t".$email. "\t".$message. "\n";

	$user = 'root';
	$password = '';
	$database = 'startravel_visitors';
	$db = new mysqli('localhost', $user, $password, $database);

	if (mysqli_connect_errno()) {
		echo "<p>blad polaczenia z bz</p>";
		exit;
	}

	$query = "INSERT INTO visitors_data (name, email, datetime, message)  VALUES(?, ?, ?, ?)";
	$command = $db->prepare($query);
	$command->bind_param('ssss', $fname, $email, $datetime, $message);
	$command->execute();

	//mail($to, $subject, $msg_details, $header);
?>