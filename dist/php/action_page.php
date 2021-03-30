<?php
	$to = // add email address before moving on server
	$msg_details = "Otrzymałeś nową wiadomość poprzez stronę Star Travel:\n".
					$_POST['fname']."\n".$_POST['email']."\n".$_POST['message']."\n";
	$subject = "Star Travel - powiadomienie!";
	$header = "From:". $_POST['email'] ."\nContent-Type:".
					' text/plain;charset="UTF-8"'.
					"\nContent-Transfer-Encoding: 8bit";

	$fname = $_POST['fname'];
	$email = $_POST['email'];
	$datetime = date('Y-m-d H:i:s');
	$message = $_POST['message'];
	$output = $fname. "\t".$email. "\t".$message. "\n";

	$user = 'root';
	$password = // add password before moving on server
	$database = 'startravel_visitors';
	$db = new mysqli('localhost', $user, $password, $database);

	$query = "INSERT INTO visitors_data (name, email, datetime, message)  VALUES(?, ?, ?, ?)";
	$command = $db->prepare($query);
	$command->bind_param('ssss', $fname, $email, $datetime, $message);
	$command->execute();

	mail($to, $subject, $msg_details, $header);
?>