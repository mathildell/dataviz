<!DOCTYPE html>
<html>
	<head>
		<title>Data Vizualisation - TP1</title>
		<!-- Inclusion CSS (librairie + perso) -->
		<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css">
		<link rel="stylesheet" type="text/css" href="css/dataviz.css">
		
		<!-- Inclusion JS (librairie + scripts de création de graph) -->
		<script type="text/javascript" src="js/jquery.js"></script>
		<script type="text/javascript" src="js/jquery.jqplot.min.js"></script>
		
		<script type="text/javascript" src="js/jerem-dataviz.js"></script>

		<script type="text/javascript" src="js/renderer/jqplot.pieRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.categoryAxisRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.dateAxisRenderer.js"></script>
	</head>
	<body>
		<?php include ('structure/header.php'); ?>
		<div id="content">
			<h2> Hommes </h2>
			<div class="plot" id="popularite_profil_hommes">
			</div>

			<h2> Femmes </h2>
			<div class="plot" id="popularite_profil_femmes">
			</div>
		</div>
		

		<?php include ('structure/footer.php'); ?>

	</body>
</html>