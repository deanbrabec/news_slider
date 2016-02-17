<!DOCTYPE html>
<html lang="cs">

<head>
    <meta charset="utf-8">
	<meta name="author" content="">
    
    <link rel="stylesheet" href="css/bootstrap.min.css">
	<script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/style.css">

    <script>
        //refresh
        setTimeout(function () {
            window.location.reload(1);
        }, 360000);
    </script>
    
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
			}).on('slid.bs.carousel', function () {percent=0;});var barInterval = setInterval(progressBarCarousel, 100);
			crsl.hover(
			    function(){
			        clearInterval(barInterval);
			    },
			    function(){
			        barInterval = setInterval(progressBarCarousel, 100);
			    })
			
			
		});
	</script>
    
    <header>
        <div class="logo"><img class="logo_svg" src="img/logo.svg"></div>
        <div class="headline">Smíchovská střední průmyslová škola
            <br><span class="headline2">Preslova 25, 150 21, Praha 5 - Smíchov</span></div>
        <div class="headline3">aktuální informace</div>
    </header>
    <div class="contentx">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner content" role="listbox">
                <?php include 'articles.php'; ?>
         
            </div>

        </div>
    </div>



</body>
	


</html>