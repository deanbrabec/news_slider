<?php 
include 'connection.php';
include 'protection.php';
$ID = $_GET['id'];
mysql_query("DELETE FROM `data`.`posts` WHERE `posts`.`id_post` = $ID");


?>



 <script type="text/javascript">
         <!--
            function Redirect() {
               window.location="index.php?text=Příspěvek byl smazán";
            }
            Redirect();
         //-->
      </script>