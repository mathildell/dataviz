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
			<div class="plot" id="pourcentage_amis_masculin_feminin">
			</div>
		</div>
		<div class="plot" id ="chart1"></div>

		<?php include ('structure/footer.php'); ?>

	</body>
</html>