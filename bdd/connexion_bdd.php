﻿<?php
	// On se connecte de la BDD
	$servername = "localhost";
	$username = "root";
	$password = "";
	$bdd_name = "tp_note_dataviz";

	// Create connection
	$conn = mysqli_connect($servername, $username, $password, $bdd_name);

	// Check connection
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	
	// Set le charset en UTF8 (pour éviter les problèmes d'accent)
	mysqli_set_charset($conn, "utf8")
?>