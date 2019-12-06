<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="css/normalize.min.css">
        <link rel="stylesheet" href="css/main.css">

        <!--[if lt IE 9]>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
            <script>window.html5 || document.write('<script src="js/vendor/html5shiv.js"><\/script>')</script>
        <![endif]-->
    </head>
    <body>

		<div class="graph-container">
			
		<div id="graph"></div>	
			
		</div>
       
<div class="button-container">
		
<button class="today-button">
Today
</button>	
		
<button class="back-button">
Back
</button>	
		
<button class="forward-button">
Forward
</button>

<?php

$fh = fopen('raw/temp_current.txt','r');

$ctemp = fgets($fh, 20);

fclose($fh);
?>			

<span class="current-temp"><?php echo $ctemp; ?>&deg;C</span>

		</div>	
	
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.11.2.min.js"><\/script>')</script>

        <script src="js/plugins.js"></script>
        <script src="js/dygraph.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
