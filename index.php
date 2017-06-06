
<!DOCTYPE html>
<html>
	<head>
		<title>Data Vizualisation - TP1</title>
		<!-- Inclusion CSS (librairie + perso) -->
		<link rel="stylesheet" type="text/css" href="css/jquery.jqplot.min.css"><!-- Latest compiled and minified CSS -->
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<link rel="stylesheet" href="https://blackrockdigital.github.io/startbootstrap-clean-blog/css/clean-blog.min.css">
		<link rel="stylesheet" type="text/css" href="css/dataviz.css">
		
		<!-- Inclusion JS (librairie + scripts de création de graph) -->
		<script type="text/javascript" src="js/jquery.js"></script>

		<script type="text/javascript" src="js/jquery.jqplot.min.js"></script>

		<script type="text/javascript" src="js/renderer/jqplot.barRenderer.js"></script>
		<script type="text/javascript" src="js/renderer/jqplot.categoryAxisRenderer.js"></script>
		
		<script type="text/javascript" src="js/dataviz.js"></script>
	</head>
	<body>
		<?php include ('structure/header.php'); ?>

		<?php if(isset($_GET["id"])){ 
			$id = $_GET["id"];
		} else{ 
			$id = 1;
		} ?>

 <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1">
                <div class="post-preview" id="profile">
										<h2 class="post-title">
										<?php 
											if(file_exists("img/avatar".$id.".png")){
												echo '<img src="img/avatar'.$id.'.png">';
											}else{
												echo '<img src="http://via.placeholder.com/100x100">';
											}
										?>
											Profil de <b id="name"></b>
										</h2>
										
									</div>
									<hr>
                <div class="post-preview">
										
	                <form method="GET" id="form_nav" class="form-inline">
	                	<div class="form-group">
	                		<label for="id" style="margin-right: 10px;">
	                			Visit user:
	                		</label>
	                		<div class="input-group">
									      <input type="text" class="form-control" name="id" value="<?= $id; ?>" id="id">
									      <div class="input-group-addon">(id)</div>
									    </div>
									    <input type="submit" class="btn btn-primary">
	                	</div>
											
										</form>
										
									</div>



                <hr>






                <div class="post-preview">
                    <h2 class="post-title">
                        Hommes/femmes par tranche d'âge
                    </h2>
										<section class="post-meta">
											<div id="age_sex_friends_inf"></div>
											<div id="age_sex_friends"></div>
										</section>
                </div>


                <hr>
                

        </div>
    </div>




		<div id="content">





		</div>
		<?php include ('structure/footer.php'); ?>
	</body>
</html>