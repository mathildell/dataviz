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
			<h2> Popularité du profil </h2>

            <input type="radio" name="genre" value="feminin" checked> Femmes <br>
            <input type="radio" name="genre" value="masculin" > Hommes

			<div class="plot" id="popularite_profil_femmes">
			</div>
            <div class="plot" id="popularite_profil_hommes">
			</div>
		</div>
		

		<?php include ('structure/footer.php'); ?>

	</body>
</html>