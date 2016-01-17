//var kodyKlawiszy={
//lewo:37 //lewo
//prawo:39 //prawo
//gora:38 //gora
//dol:40 //dol
//akcja:32 //spacja
//};
/* licznik czasu gry w milisekundach */
var zdrowie=3;
var glownaPetlaUchwyt;
var licznik = 0;
/* liczba klatek po ostatnim odswiezeniu licznika na stronie */
var klatkaPoOdswiezeniu = 0;
/* informacja co ile klatek licznik na stronie ma zostac odswiezony*/
var odswiezajCoLiczbeKlatek = 10;
var kodyKlawiszy = {
                    lewo : 37,  /* strza³ka w lewo */
                    prawo : 39, /* strza³ka w prawo */
                    gora : 38, /* strza³ka w dó³ */
                    dol : 40, /* strza³ka w górê */
                    akcja: 32 /* spacja */
               };
var wcisnietyKlawisz = 0;
var canvasElement;
 
var szerokoscCanvas = 640;
var wysokoscCanvas = 480;
 
var context;
 
var dlugoscKlatki = 100;
 var gracz = {
                x : 10,
                y : 10, 
                r : 5, 
                szybkosc : 5
            };
 
 
function sprawdzKolizje()
{
    for(var j = 0; j < platki.length; j++)
    {
        if (Math.abs(platki[j].x - gracz.x) < gracz.r + platki[j].aktualneR/2)
        {
            if (Math.abs(platki[j].y - platki[j].r/2 - gracz.y) < gracz.r + platki[j].r/2)
            {
                return true;
            }
        }
    }
    return false;
}
 function glownaPetla()
{
if(sprawdzKolizje())
{
    //var gameEndText = "KONIEC GRY";
    //var counterText = "Punkty: " + licznik.toFixed(1);
    /* napisz wysrodkowany tekst z wynikiem punktowym gracza */
    //context.shadowColor = "white";
    //context.fillStyle = "#FFD800";
    //context.font = "bold 20px sans-serif";
    //context.fillText(gameEndText, szerokoscCanvas/2 - context.measureText(gameEndText).width/2, wysokoscCanvas/2 - 30);
    //context.fillText(counterText, szerokoscCanvas/2 - context.measureText(counterText).width/2, wysokoscCanvas/2);
	//return;
	zdrowie=zdrowie-1;
	zdrowieElement.innerHTML = zdrowie.toFixed();
	 gracz.x=10;
	 gracz.y=10;
	 gracz.r=5; 
	}
	if(zdrowie<=0)
	{
	clearInterval(glownaPetla/*Uchwyt*/);
	var gameEndText = "KONIEC GRY";
    var counterText = "Punkty: " + licznik.toFixed(1);
    /* napisz wysrodkowany tekst z wynikiem punktowym gracza */
    context.shadowColor = "white";
    context.fillStyle = "#FFD800";
    context.font = "bold 20px sans-serif";
    context.fillText(gameEndText, szerokoscCanvas/2 - context.measureText(gameEndText).width/2, wysokoscCanvas/2 - 30);
    context.fillText(counterText, szerokoscCanvas/2 - context.measureText(counterText).width/2, wysokoscCanvas/2);
	return;
	}

//
/* aktualizuj licznik czasu */
licznik += dlugoscKlatki/1000.0;
klatkaPoOdswiezeniu = (klatkaPoOdswiezeniu + 1) % odswiezajCoLiczbeKlatek;
if (klatkaPoOdswiezeniu == 0)
{
    /* aktualizuj wyswietlana wartosc licznika */
    if (licznikElement)
    {
        /* wyswietl liczbe zaokraglona do jednego miejsca po przecinku */
        licznikElement.innerHTML = licznik.toFixed(1);
    }
}
/*	function ruchGracza()
{
if ((wcisnietyKlawisz == kodyKlawiszy.lewo) && (gracz.x > gracz.szybkosc))
    {
        gracz.x -= gracz.szybkosc;
    }
    else if ((wcisnietyKlawisz == kodyKlawiszy.prawo) && (gracz.x < (szerokoscCanvas - gracz.szybkosc)))
    {
        gracz.x += gracz.szybkosc;
    }
}*/
function ruchGracza()
{
    if ((wcisnietyKlawisz == kodyKlawiszy.lewo) && (gracz.x > gracz.szybkosc))
    {
        gracz.x -= gracz.szybkosc;
    }
    else if ((wcisnietyKlawisz == kodyKlawiszy.prawo) && (gracz.x < (szerokoscCanvas - gracz.szybkosc)))
    {
        gracz.x += gracz.szybkosc;
    }
    else if ((wcisnietyKlawisz == kodyKlawiszy.gora) && (gracz.y > gracz.szybkosc))
    {
        gracz.y -= gracz.szybkosc;
    }
    else if ((wcisnietyKlawisz == kodyKlawiszy.dol) && (gracz.y < (wysokoscCanvas - gracz.szybkosc)))
    {
        gracz.y += gracz.szybkosc;
    }
}

    /* wyczysc ekran po poprzedniej klatce */
    //context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillStyle=gradientTla;
	context.fillRect(0, 0, szerokoscCanvas, wysokoscCanvas);
     
 
 
    /* zaktualizuj zmienne i narysuj aktualna klatke */
 
    //co 10 klatek dodaj nowy platek sniegu az do osiagniecia maksymalnej ich liczby
    if (licznikKlatek++ == 10 && platki.length < liczbaPlatkowMax)
    {
        //dodaj nowy platek
        var nowyPlatek = new PlatekSniegu(Math.floor(Math.random()*szerokoscCanvas), 0);
        nowyPlatek.r = Math.floor(Math.random()*rozmiarPlatkaMax) + 1;
        //losuj liczbe od 1 do r, dzieki czemu platki beda roznic sie faza "obrotu"
    nowyPlatek.aktualneR = Math.floor(Math.random()*nowyPlatek.r) + 1;
    nowyPlatek.dlugosc = Math.floor(Math.random()*dlugoscProstegoToruMax) + 2;
    platki[platki.length] = nowyPlatek;
    licznikKlatek = 0;
    }
     
    //dla kazego platka
	ruchGracza();
    for(var j = 0; j < platki.length; j++)
    {

        //jesli platek jest poza canvasem
        if (platki[j].y > wysokoscCanvas + platki[j].r)
        {
            //przesun go na gore
            platki[j].y = 0;
        }
        //sprawdz czy wylosowac nowy kierunek lotu platka
        if (platki[j].dlugosc > 0)
        {
            platki[j].dlugosc--;
        }
        else
        {
            //losujemy liczbe calkowita z przedzialu [1;30]
            platki[j].dlugosc = Math.floor(Math.random()*dlugoscProstegoToruMax)+1;
             
            //losujemy liczbe ze zbioru {-1, 0, 1}
            platki[j].kierunek = Math.floor(Math.random()*3)-1; 
        }
         
        //aktualizuj pozycje platka
        platki[j].x += platki[j].kierunek;
        platki[j].y++;
         
        //obrot platka wokol osi Y
 
        //jesli platek zosta³ œciœniêty do szerokosci 0
        if (platki[j].aktualneR <= 0)
        {
        //zmien flage na rozciaganie
            platki[j].deltaR = 1;
        }
        //jesli platek zostal rozciagniety ponad swoj oryginalny rozmiar
        else if (platki[j].aktualneR >= platki[j].r)
        {
        //zmien flage na sciskanie
            platki[j].deltaR = -1;
        }
        //zmodyfikuj aktualna szerokosc zgodnie z ustawiona flaga
        platki[j].aktualneR += platki[j].deltaR;
 
		//rysuj platek
        //context.fillStyle = "#fff";
        //context.beginPath();
        //context.arc(platki[j].x, platki[j].y, platki[j].r, 0, 2*Math.PI, true /* informacja w ktora strone rysowac luk */);
        //context.closePath();
        //context.fill();
    //rysuj platek
    context.shadowBlur = 10;
    context.shadowColor = "white";
    //oblicz skladowa pozioma polozenia platka tak, aby skalowanie wygladalo jak obrot wokol pionowej osi symetrii
    var xPlatka = platki[j].x - platki[j].aktualneR/2;
    //oblicz skladowa pionowa polozenia platka
    var yPlatka = platki[j].y - platki[j].r;
    context.drawImage(platekImg, xPlatka, yPlatka, platki[j].aktualneR, platki[j].r);
	function PlatekSniegu(startX, startY)
{
    this.x = startX;
    this.y = startY;
    this.r = 20;
    this.aktualneR = this.r;
    this.deltaR = -1;
     
    this.kierunek = 0; /* wartosc ze zbioru {-1, 0, 1} */
    this.dlugosc = 0;
}
	}
//rysuj postac gracza
    context.fillStyle = "green";
    context.beginPath();
    context.arc(gracz.x, gracz.y, gracz.r, 0, 2*Math.PI, true);
    context.closePath();
    context.fill();
	}  

 
function inicjalizujGre(glownyCanvas)
{
    canvasElement = glownyCanvas;
    canvasElement.width = 800;
    canvasElement.height = 800;
	
	licznikElement =document.getElementById("licznik");
	licznikElement.innerHTML = "0";
	zdrowieElement =document.getElementById("zdrowie");
    zdrowieElement.innerHTML="3"; 
    /* jeœli element canvas jest obs³ugiwany */
    if (canvasElement.getContext)
    {
        context = canvasElement.getContext("2d");
		
		platekImg=new Image();
		platekImg.src="platek_sniegu.png";
		platki[0]=new PlatekSniegu(100,0);
         /*gradientTla = context.createLinearGradient(0, 0, 0, 800);
		 gradientTla.addColorStop(0,"black");
		 gradientTla.addColorStop(1,"#70D8FF"); */
        gradientTla = context.createLinearGradient(0, 0, 0, wysokoscCanvas);
        gradientTla.addColorStop(0, "green");
        gradientTla.addColorStop(1, "yellow");
		gracz.y = wysokoscCanvas - gracz.r;
       document.onkeydown = function(e)
                                {
                                    var e = window.event || e;
                                     
                                    wcisnietyKlawisz = e.keyCode;
                                };
				
		/* uruchom glowna petle gry */
        setInterval(glownaPetla, dlugoscKlatki);
		
    }
    else
    {
        alert("Element Canvas nie jest obs³ugiwany przez twoj¹ przegl¹darkê.");
    }
}
var dlugoscKlatki = 100;
var licznikKlatek = 0;
var liczbaPlatkowMax = 100;
 
//maksymalny promien platka
var rozmiarPlatkaMax = 13;
/* maksymalna liczba klatek, 
przez ktore platek moze leciec bez mozliwosc zmiany kierunku */
var dlugoscProstegoToruMax = 30;
 
function PlatekSniegu(startX, startY)
{
    //wspolrzedna x
    this.x = startX;
    //wspolrzedna y
    this.y = startY;
    //promien
    this.r = 5;
    //pozioma skladowa predkosci platka: -1 w lewo, 0 brak, 1 w prawo
    this.kierunek = 0; /* wartosc ze zbioru {-1, 0, 1} */
    //liczba klatek do nastepnego losowania skladowej poziomej kierunku
    this.dlugosc = 0;
}
 /*function ruchGracza()
{
if ((wcisnietyKlawisz == 37) && (gracz.x > gracz.szybkosc))
    {
        gracz.x -= gracz.szybkosc;
    }
    else if ((wcisnietyKlawisz == 39) && (gracz.x < (szerokoscCanvas - gracz.szybkosc)))
    {
        gracz.x += gracz.szybkosc;
    }
	*/
var platki = [];