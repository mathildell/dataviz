
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



	getRequest("webservices/infos_user.php?user="+user_id, function(person) { return $('#name').html(person[0][1]); });


	/***************************************
		Répartition des amis par tranche d’âge (18-21, 22-25, 26-29) et par sexe. (4 points, JQPlot Group Bar Chart).
	****************************************/

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

    $('#age_sex_friends').bind('jqplotDataMouseOver',
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

        	$('#age_sex_friends_inf').html('Genre: '+seriesIndex+', data: '+txt);
        });
	}






  /***************************************
    Pourcentage d'amis masculin et féminin
  ****************************************/


  function generatePieChart(idDiv, data) {
    // On génère l'exemple du TP :
    var plot1 = $.jqplot(idDiv, [data], {
      gridPadding: {top:0, bottom:38, left:0, right:0},
      seriesDefaults:{
        renderer:$.jqplot.PieRenderer,
        trendline:{ show:false },
        rendererOptions: { padding: 8, showDataLabels: true, sliceMargin: 6, startAngle: -90 }
      },
      legend:{
        show:true,
        placement: 'inside',
        rendererOptions: {
          numberRows: 3
        },
        location:'ne',
        marginTop: '15px'
      }
    });
  }

  function generateDateAxis(idDiv, data) {
      var plot1 = $.jqplot(idDiv, [data], {
          title:'Default Date Axis',
          axes:{
              xaxis:{
                  renderer:$.jqplot.DateAxisRenderer,
              },
              yaxis: {
                  min: 0,
                  max: 5
              }
          },
          series:[{lineWidth:4, markerOptions:{style:'square'}}]
      });
  }



  getRequest("webservices/liste_amis_user.php?user="+user_id, function(amis) {
    var amis_hommes = 0;
    var amis_femmes = 0;
    var counter = amis.length;
    $.each(amis,function(i,ami){
      getRequest("webservices/infos_user.php?user="+ami[1],function(data_ami){
        if(data_ami[0][7] == 0)
        {
          amis_femmes++;
        }
        else
        {
          amis_hommes++;
        }
        counter--;
        if(counter === 0){
          var data_tableau = [['Amis Femmes',amis_hommes],['Amis Hommes',amis_femmes]];
          generatePieChart("pourcentage_amis_masculin_feminin", data_tableau);
        }
      });
    });
  });


    /***************************************
     Popularité du profil
     ****************************************/

  getRequest("webservices/notations_user.php?user="+user_id, function(amis) {
    var un_h = 0;
    var deux_h = 0;
    var trois_h = 0;
    var quatre_h = 0;
    var cinq_h = 0;

    var un_f = 0;
    var deux_f = 0;
    var trois_f = 0;
    var quatre_f = 0;
    var cinq_f = 0;

    var counter = amis.length;
    $.each(amis,function(i,ami){
      getRequest("webservices/infos_user.php?user="+ami[0],function(data_ami){
        if(data_ami[0][7] == 0)
        {
          switch(ami[2]){
            case '1':
              un_f++;
              break;
            case '2':
              deux_f++;
              break;
            case '3':
              trois_f++;
              break;
            case '4':
              quatre_f++;
              break;
            case '5':
              cinq_f++;
              break;
          }
        }
        else
        {
          switch(ami[2]){
            case '1':
              un_h++;
              break;
            case '2':
              deux_h++;
              break;
            case '3':
              trois_h++;
              break;
            case '4':
              quatre_h++;
              break;
            case '5':
              cinq_h++;
              break;
          }
        }
        counter--;
        if(counter === 0){
          var data_tableau_femmes = [['Un',un_f],['Deux',deux_f],['Trois',trois_f],['Quatre',quatre_f],['Cinq',cinq_f]];
          var data_tableau_hommes = [['Un',un_h],['Deux',deux_h],['Trois',trois_h],['Quatre',quatre_h],['Cinq',cinq_h]];
          generatePieChart("popularite_profil_femmes", data_tableau_femmes);
          generatePieChart("popularite_profil_hommes", data_tableau_hommes);
                    $("#popularite_profil_hommes").hide();
        }
      });
    });
  });



  $('input:radio[name=genre]').change(function(){
        if(this.value === "feminin"){
            $("#popularite_profil_femmes").show();
            $("#popularite_profil_hommes").hide();
        }
        else if (this.value === "masculin") {
            $("#popularite_profil_femmes").hide();
            $("#popularite_profil_hommes").show();
        }
  });




  /***************************************
   Pourcentage de messages envoyés à des amis et à des non amis (2 points, D3 Bar Chart OU JQPlot Bar Chart OU JQPlot Pie Chart).
  ****************************************/

  getRequest("webservices/messages_user.php?user="+user_id, function(msg) {
    var senderIds = [], friendIds = [];
    $.each(msg, function(i, receiver){
      senderIds.push(receiver[1]);

      if(i+1 === msg.length){
          var totalMsg = msg.length;

        getRequest("webservices/liste_amis_user.php?user="+user_id, function(friends) {

          $.each(friends, function(i, friend){
            friendIds.push(friend[1]);

            if(i+1 === friends.length){
              var isFriend = 0, isNotFriend = 0;

                for(i = 0; i < senderIds.length; i++){
                  if($.inArray(senderIds[i], friendIds) > -1){
                    isFriend++;
                  }else{
                    isNotFriend++;
                  }

                }

                //topercent
                var msg_friends = (isFriend * 100) / totalMsg,
                    msg_not_friend = (isNotFriend * 100) / totalMsg;
                var data_tableau = [['Messages d\'amis',msg_friends],['Messages de non-amis',msg_not_friend]];
              generatePieChart("percent_friends_message", data_tableau);

            }
          });
        });
      }
    });

    /***************************************
     Popularité par date
    ****************************************/

    getRequest("webservices/notations_user.php?user="+user_id, function(notes) {
        notes.sort(function(a,b){
            var dt1 = Date.parse(a[3]);
            var dt2 = Date.parse(b[3]);
            if (dt1 < dt2) return -1;
            if (dt2 < dt1) return 1;
            return 0;
        });

        var counter = notes.length;
        var dateNotes = [];
        $.each(notes, function(i, note){
            dateNotes.push(note[3],note[2]);
            counter--;
            if(counter === 0){
                console.log(dateNotes);
                generateDateAxis('popularite_par_date',dateNotes);
            }
        });
    });
  });
});