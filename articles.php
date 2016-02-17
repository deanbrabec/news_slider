<?php
$server="127.0.0.1";
$user="root";
$pass="root";
$db="data";
$connection = mysql_connect($server,$user,$pass,$db) or die("Sorry");
mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.posts WHERE id_post <> 0 ORDER BY id_post DESC";
$result = mysql_query($sql)  or trigger_error(mysql_error(). "in".$sql);

$active = ' active';
$display_blockCarousel = NULL;
$countx = 0;

while ($row = mysql_fetch_assoc($result))
{
    $ID    = $row['id_post'];
    $headline = $row['headline'];
    $subheadline = $row['subheadline'];
    $message = $row['text'];
    $author = $row['author'];
	$date = $row['date'];
	$priority = $row['priority'];
	$datenew = new DateTime($date);
	$time = $datenew->format(' G:s');
	$date = $datenew->format(' d. m. Y');
	
	$countx++;

    $tag = <<<EOD
<div class="item$active $countx">
	<h1>$headline</h1>

	<h2>$subheadline</h2>
	<hr class="transition-timer-carousel-progress-bar" />

	<div class="date">$date</div>
	<div class="time">$time</div>

	<div class="author">$author</div>
	<div class="priority" id="checker">$priority</div>


	<article>$message
	</article>
</div>

<script>    
        if ($('.$countx .priority').is(':empty')){
        	$(".$countx .priority").addClass("no");
            
        }    
</script>
EOD;
	
    $active = NULL;
    
    $display_blockCarousel .= $tag;
	
	
    
}
?> 

<?php echo "$display_blockCarousel"; ?>


<?php
mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.banners WHERE id_banner <> 0 ORDER BY id_banner DESC";
$result = mysql_query($sql)  or trigger_error(mysql_error(). "in".$sql);

$active = ' active';
$display_blockCarousel = NULL;

while ($row = mysql_fetch_assoc($result))
{
    $ID    = $row['id_banner'];
    $filename = $row['filename'];
	
	$countx++;
    

    $tag = <<<EOD
<div class="item">
	<img src="cms/pages/uploads/$filename">

</div>
EOD;

    $active = NULL;

    $display_blockCarousel .= $tag;
    

}
?> 

<?php echo "$display_blockCarousel"; ?>


<ol class="carousel-indicators">

<?php 
for ($i=0; $i < $countx; $i++) { 
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

