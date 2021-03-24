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
	$message = $_POST['message'];
	$document_root = $_SERVER['DOCUMENT_ROOT'];
	$output = $fname. "\t".$email. "\t".$message. "\n";
	//("$document_root/./data/data_get_form.txt", 'ab') directory for server
	//before moving on server check directory!!! it may cause problems with writing/reading file
	$wp = fopen("$document_root/startravel.wroclaw.pl/./data/data_get_form.txt", 'ab');
	flock($wp, LOCK_EX);
	fwrite($wp, $output);
	fclose($wp);

	//mail($to, $subject, $msg_details, $header);
?>