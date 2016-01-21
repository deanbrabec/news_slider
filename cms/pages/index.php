<?php
include 'connection.php';
include 'protection.php';
?>

<!DOCTYPE html>
<html lang="en">

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
                            <a href="index.php" class="active"><i class="fa fa-pencil fa-fw"></i> Přehled přípěvků</a>
                        </li>
                        <li>
                            <a href="create.php"><i class="fa fa-edit fa-fw"></i> Vytvořit příspěvek</a>
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
                    <h1 class="page-header">Přehled obsahu</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                 <div class="row">
                <div class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Publikované příspěvky a bannery
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div class="table-responsive">
                                <div class="alert alert-success"><?php
                                echo htmlspecialchars($_GET['text']);
                                ?></div>
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Nadpis</th>
                                            <th>Podnadpis</th>
                                            <th>Datum publikace</th>
                                            <th>Autor</th>
                                            <th>Důležitost</th>
                                            <th><i class="fa fa-pencil fa-fw"></i></th>
                                            <th><i class="fa fa-times fa-fw"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
<?php




mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.posts WHERE id_post <> 0 ORDER BY id_post DESC";
$result = mysql_query($sql);

while ($row = mysql_fetch_assoc($result))
{
    $ID    = $row['id_post'];
    $headline = $row['headline'];
    $subheadline   = $row['subheadline'];
    $author = $row['author'];
    $date = $row['date'];
    $priority = $row['priority'];

    
    // CREATE THE HTML STRING USING HEREDOC SYNTAX
    $tag = <<<EOD
   <tr>
                                            <td>$headline</td>
                                            <td>$subheadline</td>
                                            <td>$date</td>
                                            <td>$author</td>
                                            <td>$priority</td>
                                            <td><a href="update.php?id=$ID">upravit</a></td>
                                            <td><a href="remove.php?id=$ID">smazat</a>
                                            </td>
                                        </tr>
EOD;



echo $tag;

}

?>


                                     
                                    </tbody>
                                </table>

                                                              <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Soubor</th>
                                            <th>Datum publikace</th>
                                            <th>Autor</th>
                                            <th><i class="fa fa-times fa-fw"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
<?php




mysql_query("SET NAMES 'utf8'");
$sql = "SELECT * FROM data.banners WHERE id_banner <> 0 ORDER BY id_banner DESC";
$result = mysql_query($sql);

while ($row = mysql_fetch_assoc($result))
{
    $ID    = $row['id_banner'];
    $filename = $row['filename'];
    $author = $row['author'];
    $date = $row['date'];

    
    // CREATE THE HTML STRING USING HEREDOC SYNTAX
    $tag = <<<EOD
   <tr>
                                            <td>$filename</td>
                                            <td>$date</td>
                                            <td>$author</td>
                                            <td><a href="remove_banner.php?id=$ID">smazat</a>
                                            </td>
                                        </tr>
EOD;



echo $tag;

}

?>


                                     
                                    </tbody>
                                </table>

                                

                                                                

                                

                            </div>
                            <!-- /.table-responsive -->
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                </div>
                 </div>

                 <div class="alert alert-warning" id="alert" style="visibility: hidden">Příspěvek byl smazán</div>
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
