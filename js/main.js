$(window).load(function() {
  $(".loader").fadeOut("slow");
})
//przechwytywanie nacisniecia przycisku wstecz w przegladarce
jQuery(document).ready(function($) {
  if (window.history && window.history.pushState) {
    $(window).on('popstate', function() {
      var hashLocation = location.hash;
      var hashSplit = hashLocation.split("#!/");
      var hashName = hashSplit[1];

      if (hashName !== '') {
        var hash = window.location.hash;
        if (hash === '') {
           window.location='http://planuek.prv.pl/index.html';
        }
      }
    });

    window.history.pushState('forward', null, './index.html');
  }
});

// sroll to top
$(document).ready(function(){  
    $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToTop').fadeIn();
    } else {
      $('.scrollToTop').fadeOut();
    }
  });
  
  $('.scrollToTop').click(function(){
    $('html, body').animate({scrollTop : 0},800);
    return false;
  });
  
});
// koniec kodu do przechwytywania 

//   function showViewPortSize(display) {
//     if(display) {
//       var height = jQuery(window).height();
//        width = jQuery(window).width();
//       jQuery('body').prepend('<div id="viewportsize" style="z-index:9999;position:fixed;top:40px;left:5px;color:#fff;background:#000;padding:10px">Height: '+height+'<br>Width: '+width+'</div>');
//       jQuery(window).resize(function() {
//         height = jQuery(window).height();
//         width = jQuery(window).width();
       
//         jQuery('#viewportsize').html('Height: '+height+'<br>Width: '+width);
//       });
//     }
//   }

// showViewPortSize(true);



var site = 'http://planzajec.uek.krakow.pl/index.php?&xml';
    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';

    width = jQuery(window).width();

    $.getJSON(yql, function(data) {
      parseXml(data.results[0]);
      renderDocument.init();

      function parseXml(xml) {
          
        $(xml).find("grupowanie").each(function() {
          var typ = $(this).attr("typ");
          var grupa = $(this).attr("grupa");
                
          switch(typ) {
            case "G":
                if (width > 981) {            
                 $(".grupy").append("<a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + "</a>")                  
                } else {
                  $(".grupy").append("<tr><td><a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + "</a></td></tr>").hide();                 
                }
                break;
            case "N":
                if (width > 981) {
                  $(".nauczyciele").append("<a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + " </a>");
                } else {
                  $(".nauczyciele").append("<tr><td><a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + " </a></tr></td>").hide();
                }
                break;
            case "S":
                if (width < 981) {
                  $(".sala").append("<tr><td><a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + " </a></td></tr>").hide();
                } else {
                  $(".sala").append("<a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&grupa=" + grupa + "' >" + grupa + " </a>");
                }
                break;                
            default: 
                $(".cont").append("<p>Brak danych do wyświetlenia</p>");
          }       
        });
      }

    }); // funkcja parseXml na głównej

    if(width < 981) {
    $(document).ready(function() {
      $(".sal").click(function() {
        $('.sala').toggle();
          $(".nauczyciele").hide();
          $(".grupy").hide();
      });
      $(".nau").click(function() {
        $(".nauczyciele").toggle();
          $(".grupy").hide();
          $(".sala").hide();
      });
      $(".gr").click(function() {
        $(".grupy").toggle();
          $(".nauczyciele").hide();
          $(".sala").hide();
      })
    });
    }

    var renderDocument = {
      init: function(){
        var mainThis = this;
        mainThis.bindLinks('.grupy');
        mainThis.bindLinks('.nauczyciele');
        mainThis.bindLinks('.sala');
        mainThis.bindLinks('.cont');
      },// metoda init
      
      bindLinks: function(selector){
        var okesPierwszy = this;
        var mainThis = this;  
        


        if (!($(".wizytowka").length)){
   
        $(selector + " a").on('click', function (e) {
          e.preventDefault();
         okesPierwszy.parseXml($(this).attr('href'),1 , function (data) {
            switch(selector) {
              case ".grupy":
                    mainThis.renderJsonData(data, '.grupy', 1)
                    mainThis.bindLinks('.grupy')
                    break;
              case ".nauczyciele":
                    mainThis.renderJsonData(data, '.nauczyciele',1)
                    mainThis.bindLinks('.nauczyciele')
                    break;
              case ".sala":
                    mainThis.renderJsonData(data, '.cont', 1)
                    mainThis.bindLinks('.cont')
                    break;
              case ".cont":
                    mainThis.renderJsonData(data, '.cont', 1)
                    mainThis.bindLinks('.cont')
                    break;
              default:
                    console.log("Brak danych");
            }
          })

          mainThis.parseXml($(this).attr('href'), 2, function (data) {
            setTimeout(function(){
              
            switch(selector) {
              case ".grupy":
                    mainThis.renderJsonData(data, '.tresc', 2)
                    mainThis.bindLinks('.grupy')
                    break;
              case ".nauczyciele":
                    mainThis.renderJsonData(data, '.tresc', 2)
                    mainThis.bindLinks('.nauczyciele')
                    break;
              case ".sala":
                    mainThis.renderJsonData(data, '.tresc', 2)
                    mainThis.bindLinks('.sala')
                    break;
              case ".cont":
                    mainThis.renderJsonData(data, '.tresc', 2)
                    mainThis.bindLinks('.tresc')
                    break;
              default:
                  console.log("Brak danych");
            }
            }, 1000); 
          })
        })
        }
      }, // metoda bindLinks

      parseXml: function(url,flaga, callback){
          urlOkres1 = url;
          urlOkres1 = urlOkres1 + "&okres=" + flaga;
          urlOkres1 = urlOkres1+"&xml";
          urlOkres1 = urlOkres1.replace(/\ /g, '%20');

          var yql1 = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + urlOkres1 + '"') + '&format=xml&callback=?';

          $.getJSON(yql1, function(data){
            callback(data);
          })       
      }, // metoda parselXml

      renderJsonData: function (data, selector, flaga) {
        $(selector).html(' ');
        width = jQuery(window).width();

        grupaSala = $(data.results[0]).attr("grupa");
        nazwaGrupySali = $(data.results[0]).attr("nazwa");
  
        $(data.results[0]).find("zasob").each(function() {

          var typ = $(this).attr("typ");
          var nazwa = $(this).attr("nazwa");
          var id = $(this).attr("id");

          if(!($('.grupaSzczegol').length > 0)){
            $(selector).append("<div class='grupaSzczegol'>"+grupaSala+"</div>");
          }


        $(selector).append("<tr><td class='nrTd'><a href='http://planzajec.uek.krakow.pl/index.php?typ=" + typ + "&id=" + id + "' >" + nazwa + "&nbsp</a></td></tr>");
        });

        if(($(data.results[0]).attr("grupa"))  === undefined){
            $(selector).append("<p class='brakPrzypisanegoPlanu'>Obecnie brak przypisanego planu zajęc!</p>");        
          }

          $(data.results[0]).find("zajecia").each(function() {
          var nauczyciel,nauczycielWizytowka, sala, termin, dzien, od_godz, do_godz, przedmiot, typ,grupa, typPrzedmiot, uwagi, uwagiDoPrzedmiotu, brakSali, nazwa;
          
          typPrzedmiot = "typPrzedmiot";
          uwagiDoPrzedmiotu = "uwagiDoPrzedmiotu";
          brakSali = "sala" 
          wizytowka = "wizytowka";         
          nauczyciel = $(this).find("nauczyciel").html();
          nauczycielWizytowka = $(this).find("nauczyciel").attr("moodle");
          grupa = $(this).find("grupa").html();
          termin = $(this).find("termin").html();
          dzien = $(this).find("dzien").html();
          od_godz = $(this).find("od-godz").html();
          do_godz = $(this).find("do-godz").html();
          przedmiot = $(this).find("przedmiot").html();
          typ = $(this).find("typ").html();
          sala = $(this).find("sala").html();
          uwagi = $(this).find("uwagi").html();
          nazwa = $(this).find("nazwa").html();
          

          if(nauczycielWizytowka === undefined){
            wizytowka = "brakWizytowki";
          } else {
          nauczycielWizytowka = nauczycielWizytowka.replace(/-/g, '');
          }

          if (uwagi === undefined){
              uwagiDoPrzedmiotu = "brakUwag";
          }

          if(typ === "Przeniesienie zajęć"){
            typPrzedmiot = "typPrzeniesienie";
          }

          if(sala === undefined){
            brakSali = "brakSali";
          }

          $(".brakPrzypisanegoPlanu").remove();      

          console.log("Flaga: " + flaga, " Selektor: " + selector + " data: " + data);

          if(!($('.valid').length > 0)) {
          $(selector).append("<div class='grupaSzczegol'>"+nazwaGrupySali+"</div>");

          $(selector).append("<div class='valid'><ul class='nav nav-tabs' role='tablist'><li class='active'><a href='#1zakladka' role='tab' data-toggle='tab'>14-dniowy</a></li><li><a href='#2zakladka' role='tab' data-toggle='tab'>Semestralny</a></li></ul><div class='tab-content'><div class='tab-pane active wynik2' id='1zakladka'></div><div class='tab-pane result' id='2zakladka'></div></div></div>");   
        }               

        switch(flaga){
          case 1:
                if (width < 981){
                  $(".wynik2").append("<table class='table'><tr><th class='topTable'><span class='termin'>"+termin+" "+dzien+ " </span><span class='odDoGodzina'>"+od_godz+ " - "+ do_godz +"</span></th></tr>" + "<tr><td class='midleTable'><span class='"+typPrzedmiot+"'>["+typ+"] "+przedmiot+"</span></td></tr>"+"<tr><td class='midleTable'><span class='prowadzacy'>"+ nauczyciel+ "</span><span class='"+uwagiDoPrzedmiotu+"'>"+uwagi+"</span></td></tr>" + "<tr><td class='footerTable'><span class='"+brakSali+"'>"+sala+"</span></td></tr></table>")                  
                } else {
                  if(!($('.t1').length > 0)){
                    $(".wynik2").append("<table class='table table-hover'><thead><tr><th>Termin</th><th>Dzień, godzina</th><th>Przedmiot</th><th>Typ</th><th>Nauczyciel</th><th>Grupa</th></tr></thead><tbody class='t1'></tbody></table>")                    
                  }

                  $(".t1").append("<tr><td>"+termin+"</td><td>  "+dzien+ " " +od_godz+ " - "+ do_godz +"</td>" + "<td><td>"+typ+" "+przedmiot+"</td>"+"<td>"+ nauczyciel+ " <a href='https://e-uczelnia.uek.krakow.pl/course/view.php?id="+ nauczycielWizytowka +"#section-0' class='"+wizytowka+"'> &nbsp;&nbsp;</a><span class='"+uwagiDoPrzedmiotu+"'>"+uwagi+"</span></td>" + "<td><span class='"+brakSali+"'>"+sala+"</span></td>")
                }
                break;
          case 2:
              if(width < 981){
                $(" .result").append("<table class='table'><tr><th class='topTable'><span class='termin'>"+termin+" "+dzien+ " </span><span class='odDoGodzina'>"+od_godz+ " - "+ do_godz +"</span></th></tr>" + "<tr><td class='midleTable'><span class='"+typPrzedmiot+"'>["+typ+"] "+przedmiot+"</span></td></tr>"+"<tr><td class='midleTable'><span class='prowadzacy'>"+ nauczyciel+ "</span><span class='"+uwagiDoPrzedmiotu+"'>"+uwagi+"</span></td></tr>" + "<tr><td class='footerTable'><span class='"+brakSali+"'>"+sala+"</span></td></tr></table>")                
              } else {
                if(!($('.t2').length > 0)){
                    $(".result").append("<table class='table table-hover'><thead><tr><th>Termin</th><th>Dzień, godzina</th><th>Przedmiot</th><th>Typ</th><th>Nauczyciel</th><th>Grupa</th></tr></thead><tbody class='t2'></tbody></table>")                    
                  }
                $(".t2").append("<tr><td>"+termin+"</td><td>  "+dzien+ " " +od_godz+ " - "+ do_godz +"</td>" + "<td><td>"+typ+" "+przedmiot+"</td>"+"<td>"+ nauczyciel+ "<a href='https://e-uczelnia.uek.krakow.pl/course/view.php?id="+ nauczycielWizytowka +"#section-0' class='"+wizytowka+"'> &nbsp;&nbsp;</a><span class='"+uwagiDoPrzedmiotu+"'>"+uwagi+"</span></td>" + "<td><span class='"+brakSali+"'>"+sala+"</span></td>")                
              }
                break;
          default:
            $(".result").append("<p>Brak danych spróbuj jeszcze raz</p>");        
        }
       });
      } // metoda renderJsonData
    } // klasa renderDocument
