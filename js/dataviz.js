$(document).ready(function(){
	// Pas de cache sur les requête IMPORTANT !
	$.ajaxSetup({ cache: false });
	
	/*** 
		On définit ici les fonctions de base qui vont nous servir à la récupération des données
		Je ne définis que le GET ici, mais il est possible d'utiliser POST pour récupérer ses données (on le verra dans un prochain TP)
	****/
	function getRequest(url, callback, callback2) {
		$.get(url, function(data) {
			data = $.parseJSON(data);
			callback(data);
		});
	}
	

	var user_id = $('#id').val();
	 
	 getRequest("webservices/infos_user.php?user="+user_id, function(person) { return $('#name').html(person[0][1]); })
	

	/***************************************
		QUESTION 1 : PIE CHART : Visite par marque
	****************************************/
	/*getRequest("webservices/infos_user.php?user="+user_id, function(data) {
		console.log(data);
	});*/



	//Répartition des amis par tranche d’âge (18-21, 22-25, 26-29) et par sexe. (4 points, JQPlot Group Bar Chart).

	getRequest("webservices/liste_amis_user.php?user="+user_id, function(amis) {
		var  	friends = [], friend_18 = 0,
					friend_22 = 0,
					friend_26 = 0,
					friend_18_f = 0,
					friend_18_m = 0,
					friend_22_f = 0,
					friend_22_m = 0,
					friend_26_f = 0,
					friend_26_m = 0;
					count = amis.length;
					console.log(amis.length);

		$.each(amis, function(i, ami){

			var friend_id = ami[1];
			//get user's friend age
				getRequest("webservices/infos_user.php?user="+friend_id, function(info) {
					friends.push({age: info[0][6], gender: info[0][7]});
					if(info[0][6] < 22){
						friend_18 = friend_18 + 1;
						if(info[0][7] === 0){
							friend_18_f = friend_18_f+1;
						}else{
							friend_18_m = friend_18_m+1;
						}
					}else if(info[0][6] < 26){
						friend_22 = friend_22+1;
						if(info[0][7] === 0){
							friend_22_f = friend_22_f+1;
						}else{
							friend_22_m = friend_22_m+1;
						}
					}else if(info[0][6] < 30){
						friend_26 = friend_26+1;
						if(info[0][7] === 0){
							friend_26_f = friend_26_f+1;
						}else{
							friend_26_m = friend_26_m+1;
						}
					}
			
					count--;
				if(count === 0){
					friendRatioDone(friend_18,friend_22,friend_26,friend_18_f,friend_18_m,friend_22_f,friend_22_m,friend_26_f,friend_26_m);
				}
			});
		});
     
		//after each
		
	});

	function friendRatioDone(friend_18,friend_22,friend_26,friend_18_f,friend_18_m,friend_22_f,friend_22_m,friend_26_f,friend_26_m){
		console.log(friend_18_f, friend_18_m,friend_22_f, friend_22_m,friend_26);
		$.jqplot.config.enablePlugins = true;
      var s1 = [friend_18_m, friend_22_m, friend_26_m]; //nmbr boys
      var s2 = [friend_18_f, friend_22_f, friend_26_f]; //nmbr of girls
      var ticks = ['18-21', '22-25', '26-29'];
       
      plot2 = $.jqplot('age_sex_friends', [s1, s2], {
          seriesDefaults: {
              renderer:$.jqplot.BarRenderer,
              pointLabels: { show: true }
          },
          axes: {
              xaxis: {
                  renderer: $.jqplot.CategoryAxisRenderer,
                  ticks: ticks
              }
          }
 


      });
         
    $('#age_sex_friends').bind('jqplotDataClick', 
        function (ev, seriesIndex, pointIndex, data) {
        	if(seriesIndex === 0){
        		seriesIndex = "femme";
        	}else{
        		seriesIndex = "homme";
        	}
        	if(pointIndex === 0){
        		var nmbr = friend_18;
        	}else if(pointIndex === 1){
        		var nmbr = friend_22;

        	}else{
        		var nmbr = friend_26;

        	}
        	txt = data[1]+" "+seriesIndex+"(s) out of "+nmbr+" friends of this demographics"

        	$('#age_sex_friends_inf').html('homme/femme: '+seriesIndex+', point: '+pointIndex+', data: '+txt);
        });
	}








});