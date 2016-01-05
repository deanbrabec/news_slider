<!DOCTYPE html>
<html lang="cs">
<head>

		<meta charset="utf-8">
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<style>
	    *{
	    	margin:0px;
	    	padding: 0px;
	    	font-family: teuton;
	    	color:black;
	    	}
	    @font-face {
	    	font-family: teuton;
	    	src: url(TeutonNormal.otf);
	    }
		header{
			width: 1920px;
			height: 150px;
		}
		.logo{width: 134px;
			height: 95px;
			float: left;
			margin-left: 60px;
		}
		.headline{
			height: 75px;
			float: left;
			margin-top: 30px;
			margin-left: 10px;
			font-size: 36px;
			padding-top: 20px;
			line-height: 30px;
		}
		.headline2{
			font-size: 18px;
			color: #646464;
		}
		.headline3{
			float: right;
			margin-top: 30px;
			margin-right: 30px;
			font-size: 65px;
		}
		.contentx{
			width: 1920px;
			height: 480px;
			background-image: url(img/bg.png);
		}
		h1{
			font-size: 120px;
			padding-top: 20px;
			padding-left: 60px;
			display: block;
			color: white;
			font-weight: 100;
		}
		h2{
			font-size: 90px;
			padding-left: 60px;
			color: white;
			font-weight: 100;
			padding-bottom:20px;
		}
	
		.author{
			font-size: 45px;
			padding-top: 35px;
			padding-left: 60px;
			float: left;
			color: white;
			font-weight: 100;
		}
		.time{
			font-size: 40px;
			float: left;
			padding-top: 35px;
			padding-left: 60px;
			color:white;
			font-weight: 100;
		}
		.time::before{
			content:url(img/time.png);
			float: left;padding-right: 30px;
			margin-top: -15px
		}
		.author::before{
			content:url(img/user.png);
			float: left;
			padding-right: 30px;
			margin-top: -15px
		}
		.carousel-indicators li{
			border: 2px solid #949494;
			width: 30px !important;
			height: 30px !important;
			border-radius: 20px;
		}
		.carousel-indicators li.active{
			background-color: #949494;
		}

		article{
			font-size: 45px;
			padding-top: 165px;
			padding-left: 60px;
			padding-right: 60px; 
			line-height: 80px;
			padding-bottom: 90px;
			letter-spacing: 5px;
			text-align: justify;
		}
		.logo_svg{
			height: 250px;
			width: 250px;
			margin-top: -50px;
		}
		.transition-timer-carousel-progress-bar {
		    height: 6px;
		    background-color: white;
		    width: 0%;
		    border: none;
		    z-index: 11;
		}
	</style>
</head>	
<body>
	<script>
			$(document).ready(function(){
			var percent = 0, bar = $('.transition-timer-carousel-progress-bar'), crsl = $('#myCarousel');
			function progressBarCarousel() {
			  bar.css({width:percent+'%'});
			 percent = percent +0.5;
			  if (percent>100) {
			      percent=-20;
			      crsl.carousel('next');
			  }      
			}
			crsl.carousel({
			    interval: false,
			    pause: true
			}).on('slid.bs.carousel', function () {percent=0;});var barInterval = setInterval(progressBarCarousel, 50);
			crsl.hover(
			    function(){
			        clearInterval(barInterval);
			    },
			    function(){
			        barInterval = setInterval(progressBarCarousel, 50);
			    })
		});
	</script>

	<header>
        <div class="logo"><img class="logo_svg" src="img/logo.svg"></div>
        <div class="headline">Smíchovská střední průmyslová škola<br><span class="headline2">Preslova 25, 150 21, Praha 5 - Smíchov</span></div>
        <div class="headline3">aktuální informace</div>
	</header>
	<div class="contentx">
		 <div id="myCarousel" class="carousel slide" data-ride="carousel">
				<div class="carousel-inner content" role="listbox">

					<?php
						include 'articles.php';
					?>
				</div>
		</div>
</body>
</html>