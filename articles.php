<?php
$server="127.0.0.1";
$user="root";
$pass="";
$db="data";



mysql_connect($server,$user,$pass,$db) or die("Sorry");



$connection = mysql_connect($server,$user,$pass,$db) or die("Sorry");
mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.posts WHERE id_post <> 0 ORDER BY id_post DESC";
$result = mysql_query($sql)  or trigger_error(mysql_error(). "in".$sql);





// QUERY AND RESULTS SET



// SETTING FOR INITIAL ITEM IS 'ITEM ACTIVE'
$active = ' active';
$display_blockCarousel = NULL;
$countx = 0;

// ITERATE OVER EACH ROW OF THE RESULTS SET
while ($row = mysql_fetch_assoc($result))
{
    $ID    = $row['id_post'];
    $headline = $row['headline'];
    $hastag   = $row['subheadline'];
    $message = $row['text'];
    $author = $row['author'];
	$date = $row['date'];

	$datenew = new DateTime($date);
	$ahoj = $datenew->format(' G:s, d. m. Y');
	
	$countx++;
    
    // CREATE THE HTML STRING USING HEREDOC SYNTAX
    $tag = <<<EOD
<div class="item$active">
	<h1>$headline</h1>
									        
									    	<h2>$hastag</h2>
									        <hr class="transition-timer-carousel-progress-bar" />
									    
									        <div class="time">$ahoj</div>
									        <div class="author">$author</div>
									        
							
					  			<article>$message
					  			</article>
</div>
EOD;

    // RESET THE 'ACTIVE' ELEMENT
    $active = NULL;
    
    // APPEND THE HTML STRING TO THE VARIABLE
    $display_blockCarousel .= $tag;
    
// END OF THE WHILE LOOP

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
						 
					    	
					    	
  					