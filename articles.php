<?php
$active = ' active';
$display_blockCarousel = NULL;
$countx = 0;


include 'mnews/mn-show.php';


$mn_mode = 'gallery';
$mn_gallery = 1;
include 'mnews/mn-show.php';


?>

<ol class="carousel-indicators">

<?php

$myFile = "mnews/data/databases/id_posts.php";
$lines = file($myFile);//file in to an array
$test = $lines[0]; //line 2


for ($i=0; $i < $test; $i++) { 
	if($i==0){
		echo '<li data-target="#myCarousel" class="active"></li>';
	}
	else
	{
		echo '<li data-target="#myCarousel"></li>';
	}
}
?>

</ol>	


