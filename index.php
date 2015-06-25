<?php 
// header('Access-Control-Allow-Origin: *');  
// header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');
 ?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery.parseXML demo</title>
  <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
   <link href="css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="planzajec.css">
</head>
<body>
<div class="naglowek">
<div class="logo"><img src="UEK-logo.gif" alt=""></div>
<div class="planzajec"><a href="index.php">Plan Zajęć</a></div>
</div>
<form action="index.php" method="get">
<input type="hidden" name="typ" value="G"><input type="hidden" name="id" value="116061">okres: <select name="okres"><option selected value="1"></option>
<option value="2">2015-02-16 do 2015-09-30</option></select><button type="submit">Ok</button>
</form>
<div class="grupa">KrDZIa3012</div>
 <p id="output"></p>
<p class="class"></p>
<div class="container">
  <div class="row">
      <div class="alt">
<!--    <div class="col-lg-1 termin"></div>    
        <div class="col-lg-2 dzien"></div>   
        <div class="col-lg-3 przedmiot"></div>
        <div class="col-lg-1 typ"></div>
        <div class="col-lg-3 nauczyciel"></div>
        <div class="col-lg-2 sala"></div> -->
      <table style="width:100%" class="tab"></table>
      </div>
  </div>
</div>

<div class="calosc">
	<div class="terminTop"><span class="text">Termin</span></div>
	<div class="dzienTop">dzien</div>
	<div class="przedmiotTop">przedmiot</div>
	<div class="typTop">typ</div>
	<div class="nauczycielTop">nauczyciel</div>
	<div class="salaTop">sala</div>
</div>

<script>
site = 'http://planzajec.uek.krakow.pl/index.php?typ=G&id=116071&okres=2&xml';


var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';

// Request that YSQL string, and run a callback function.
// Pass a defined function to prevent cache-busting.
$.getJSON(yql, function(data){
    console.log(data.results[0]);

    parseXml(data.results[0]);
      function parseXml(xml)
{ 


  // $(xml).find("plan-zajec").attr("okres").each(function(){
    

  // });

  var alt = $(".alt");
  $(xml).find("zajecia").each(function()
  {
    // var i = $xml.find("zajecia").index(this);
    var termin = $(this).find("termin").text();
    var dzien = $(this).find("dzien").text();
    dzien += " ";
    dzien += $(this).find("od-godz").text();
    dzien += " - ";
    dzien += $(this).find("do-godz").text();
    var przedmiot = $(this).find("przedmiot").text();
    var typ = $(this).find("typ").text();
    var nauczyciel = $(this).find("nauczyciel").text();
    var sala = $(this).find("sala").text();

    if (!sala.trim()){
      sala = " &nbsp; ";
    }
    
  // $(".alt").append("<div class='col-lg-1 termin'>" + termin + "</div>" + "<div class='col-lg-2 dzien'>" + dzien + "</div>" + "<div class='col-lg-3 przedmiot'>" + przedmiot + "</div>" + "<div class='col-lg-2 typ'>" + typ + "</div>" + "<div class='col-lg-2 nauczyciel'>" + nauczyciel + "</div>" + "<div class='col-lg-2 sala'>" + sala + "</div>");
  var widthSize = $(window).width();

  if(widthSize >= 970){
  $(".alt").append("<tr><td class='termin'>" + termin + "</td>" + "<td class='dzien'>" + dzien + "</td>" + "<td class='przedmiot'>" + przedmiot + "</td>" + "<td class='typ'>" + typ + "</td>" + "<td class='nauczyciel'>" + nauczyciel + "</td>" + "<td class='sala'>" + sala + "</td></tr>");
 } if(widthSize < 970) {
  $(".tab").append(
    "<tr>"+
       "<td class='header'><span class='termin'>" + termin + " "+ "</span><span class='dzien'>" + dzien + "</span></td>"+ 
    "</tr>" +
    "<tr>" + 
        "<td><span class='typ'>[" + typ + "]</span><span class='przedmiot'>" + przedmiot + "</td>" + 
    "</tr>"+
    "<tr>"+
        "<td><span class='nauczyciel'>" + nauczyciel + "</span><br><span class='sala'>" + sala + "</span></td>" + 
    "</tr>");
   }
    $("tr:even").css("background-color","rgb(255,255,0)");
    // rgba equivalent for yellow with 50% opacity
    $("tr:odd").css("background-color","rgba(255,255,0,0.5)");
  });
}

    var termin = $(data.results[0]).find("termin").text();
    // alert(termin);
    $('.alt').append("<tr><td class='termi'>" + termin + "</td></tr>");
});





$(document).ready(function()
{
  $.ajax({
    type: "GET",
    crossDomain: true,
    url: 'http://planzajec.uek.krakow.pl/index.php?typ=G&id=116071&okres=2&xml',
    
    dataType: "jsonp xml",
    beforeSend: setHeader,
    success: parseXml
  });

  function parseXml(xml)
{	


	// $(xml).find("plan-zajec").attr("okres").each(function(){
		

	// });

  var alt = $(".alt");
  $(xml).find("zajecia").each(function()
  {
    // var i = $xml.find("zajecia").index(this);
    var termin = $(this).find("termin").text();
    var dzien = $(this).find("dzien").text();
    dzien += " ";
    dzien += $(this).find("od-godz").text();
    dzien += " - ";
    dzien += $(this).find("do-godz").text();
    var przedmiot = $(this).find("przedmiot").text();
    var typ = $(this).find("typ").text();
    var nauczyciel = $(this).find("nauczyciel").text();
    var sala = $(this).find("sala").text();

    if (!sala.trim()){
      sala = " &nbsp; ";
    }
    
  // $(".alt").append("<div class='col-lg-1 termin'>" + termin + "</div>" + "<div class='col-lg-2 dzien'>" + dzien + "</div>" + "<div class='col-lg-3 przedmiot'>" + przedmiot + "</div>" + "<div class='col-lg-2 typ'>" + typ + "</div>" + "<div class='col-lg-2 nauczyciel'>" + nauczyciel + "</div>" + "<div class='col-lg-2 sala'>" + sala + "</div>");
  var widthSize = $(window).width();

  if(widthSize >= 970){
  $(".alt").append("<tr><td class='termin'>" + termin + "</td>" + "<td class='dzien'>" + dzien + "</td>" + "<td class='przedmiot'>" + przedmiot + "</td>" + "<td class='typ'>" + typ + "</td>" + "<td class='nauczyciel'>" + nauczyciel + "</td>" + "<td class='sala'>" + sala + "</td></tr>");
 } if(widthSize < 970) {
  $(".tab").append(
    "<tr>"+
       "<td class='header'><span class='termin'>" + termin + " "+ "</span><span class='dzien'>" + dzien + "</span></td>"+ 
    "</tr>" +
    "<tr>" + 
        "<td><span class='typ'>[" + typ + "]</span><span class='przedmiot'>" + przedmiot + "</td>" + 
    "</tr>"+
    "<tr>"+
        "<td><span class='nauczyciel'>" + nauczyciel + "</span><br><span class='sala'>" + sala + "</span></td>" + 
    "</tr>");
   }
    $("tr:even").css("background-color","rgb(255,255,0)");
    // rgba equivalent for yellow with 50% opacity
    $("tr:odd").css("background-color","rgba(255,255,0,0.5)");
  });
}

});
 // alert($(window).width());




</script>
 
</body>
</html>