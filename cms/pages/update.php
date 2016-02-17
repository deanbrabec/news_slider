<?php
include 'connection.php';
include 'protection.php';

?>

<!DOCTYPE html>
<html lang="cz">
<meta charset="UTF-8">

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
                        <li><a href="logout.php"><i class="fa fa-sign-out fa-fw"></i> Odhlásit</a>
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
                            <a href="create.php" class="active"><i class="fa fa-edit fa-fw"></i> Vytvořit příspěvek</a>
                        </li>
                        <li>
                            <a href="create_banner.php"><i class="fa fa-edit fa-fw"></i> Přidat banner</a>
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
                    <h1 class="page-header">Upravit příspěvek</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>

<?php
$id_post = $_GET['id'];


    mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.posts WHERE id_post=$id_post";
$result = mysql_query($sql);

while ($res = mysql_fetch_array($result)) {
    $headline = $res['headline'];
    $subheadline = $res['subheadline'];
    $text = $res['text'];
}
?>
            <!-- /.row -->
            <div class="row">
                                <div class="col-lg-6">
                                    <form role="form" method="post">
                                        <div class="form-group">
                                            <label>Nadpis</label>
                                            <input maxlength="35" name="headline" required class="form-control" value="<?php echo $headline?>">
                                            <p class="help-block">* Maximální délka je 35 znaků</p>
                                        </div>
                                         <div class="form-group">
                                           <label>Podnadpis</label>
                                            <input maxlength="45" name="subheadline" required class="form-control" value="<?php echo $subheadline?>">
                                            <p class="help-block">* Maximální délka je 45 znaků</p>
                                        </div>
                                          <div class="form-group">
                                            <label>Důležitost</label><br>
                                            <input type="radio" name="priority" value="Vysoká důležitost" required> Vysoká důležitost<br>
                                            <input type="radio" name="priority" value="" required> Standardní důležitost
                                        </div>
                                        <div class="form-group">
                                            <label>Text příspěvku</label>
                                            <textarea rows="4" required name="text" maxlength="330" class="form-control"><?php echo $text?></textarea>
                                            <p class="help-block">* Maximální délka je 330 znaků</p>
                                        </div>
                                        <input type="submit" name="go" value="Upravit" class="btn btn-default">

                                        <button type="reset" class="btn btn-default">Reset</button>
                                    </form>
                                </div>
                
                 </div>
<?php
if(isset($_POST['go'])&& !empty($_POST['go'])){ 


$headline = $_POST['headline'];  
$subheadline = $_POST['subheadline'];
$text = $_POST['text'];
$priority = $_POST['priority'];
$date = date("Y-m-d H:i:s");
$id = $_GET['id'];



mysql_query("SET NAMES 'utf8'");
$sql = "UPDATE `data`.`posts` SET `headline`='$headline', `subheadline`='$subheadline', `text`='$text', `priority`='$priority' WHERE `id_post`='$id';";
mysql_query($sql);

 echo ' <script type="text/javascript">
         <!--
            function Redirect() {
               window.location="index.php?text=Příspěvek byl vytvořen";
            }
            Redirect();
         //-->
      </script> ';

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

