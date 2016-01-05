<?php 
include 'connection.php';
include 'protection.php';
$ID = $_GET['id'];
mysql_query("DELETE FROM `data`.`banners` WHERE `banners`.`id_banner` = $ID");


?>



 <script type="text/javascript">
         <!--
            function Redirect() {
               window.location="index.php?text=Banner byl smazán";
            }
            Redirect();
         //-->
      </script>