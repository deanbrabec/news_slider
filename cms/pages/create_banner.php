<?php
include 'connection.php';
include 'protection.php';

?>

<!DOCTYPE html>
<html lang="cz">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Administrace LCD panelu - SSPŠ</title>

    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="../dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="../bower_components/morrisjs/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.php"><i class="fa fa-wrench fa-fw"></i> Administrace informačního panelu</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                   
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>  <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="login.php"><i class="fa fa-sign-out fa-fw"></i> Odhlásit</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li>
                            <a href="index.php"><i class="fa fa-pencil fa-fw"></i> Přehled přípěvků</a>
                        </li>
                        <li>
                            <a href="create.php"><i class="fa fa-edit fa-fw"></i> Vytvořit příspěvek</a>
                        </li>
                        <li>
                            <a href="create_banner.php" class="active"><i class="fa fa-edit fa-fw"></i> Přidat banner</a>
                        </li>
                       </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Přidat banner</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>

       
      </script>

            <!-- /.row -->
            <div class="row">
                                <div class="col-lg-6">
                                    <form action="" method="post" enctype="multipart/form-data">
                                        <input type="file" name="fileToUpload" id="fileToUpload">
                                        <br>
                                        <input type="submit" name="go" value="Publikovat" class="btn btn-default" name="submit">
                                    </form>
                                </div>
                
                 </div>
<?php

if(isset($_POST['go'])&& !empty($_POST['go']) && !empty($_FILES["fileToUpload"]["name"])){ 

$author = $_SESSION["username"];
$date = date("Y-m-d H:i:s");

$target_dir = "uploads/";

$filename = basename($_FILES["fileToUpload"]["name"]);

$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);

mysql_query("SET NAMES 'utf8'");
$sql = "INSERT INTO `data`.`banners` (`id_banner`, `filename`, `author`, `date`) VALUES (NULL, '$filename', '$author', '$date');";
mysql_query($sql);



$uploadOk = 1;
$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);

if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "Soubor je ve špatném formátu - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "Soubor je ve špatném formátu";
        $uploadOk = 0;
    }
}

if (file_exists($target_file)) {
    echo "Soubor již existuje";
    $uploadOk = 0;
}

if ($_FILES["fileToUpload"]["size"] > 50000000000) {
    echo "Soubor je příliš velký";
    $uploadOk = 0;
}

if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
&& $imageFileType != "gif" ) {
    echo "Povolené formáty JPG, JPEG, PNG & GIF";
    $uploadOk = 0;
}

if ($uploadOk == 0) {
    echo "Chyba, soubr nebyl nahrán";

} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " byl úspěšně nahrán.";
    } else {
        echo "Chyba, soubr nebyl nahrán";

    }

     
}



}


?>




                <!-- /.col-lg-4 -->
      
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="../bower_components/raphael/raphael-min.js"></script>
    <script src="../bower_components/morrisjs/morris.min.js"></script>
    <script src="../js/morris-data.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

</body>

</html>

