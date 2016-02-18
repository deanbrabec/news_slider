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


$filename="mnews/data/databases/posts.php";

$lines = count(file($filename)); 

$filename2="mnews/data/databases/files.php";

$lines2 = count(file($filename2));

$count = $lines + $lines2 -2;


for ($i=0; $i < $count; $i++) { 
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


