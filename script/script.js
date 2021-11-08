'use strict';
let main = document.querySelector('main');
let start = document.querySelector('#start');
let regeln = document.querySelector('#regeln');
let btnStart = document.querySelector("#btnStart");
let btnRegeln = document.querySelector("#btnRegeln");
let spielFeld = document.querySelector("#spielFeld");


let pfade = ['img/MemoAtardecer.jpg', 'img/MemoDunaValizas.jpg', 'img/MemoLobodeMar.jpg',
    'img/MemoPesca.jpg', 'img/MemoPinar.jpg',
    'img/MemoTopVal.jpg', 'img/MemoValizas.jpg', 'img/MemoPandeAzucar.jpg'];

let karten = [];
let zweiKartenVergleich = [];
let spielStart = true;
let paarGefunden = 0;
let paar =[];



document.addEventListener("DOMContentLoaded", evt => {


    const init = () => {
        karten = [];
        for (let i = 0; i < pfade.length; i++) {
            for (let k = 0; k < 2; k++) {
                karten.push({
                    pfad: pfade[i],
                    id: i
                })
            }
        }

        for (let i = 0; i < karten.length; i++) {
            let zufall = ~~(Math.random() * karten.length);
            let temp = karten[i]
            karten[i] = karten[zufall];
            karten[zufall] = temp;
        }
    }

    const zeichen = () => {
        for (let i = 0; i < karten.length; i++) {
            let elKarte = document.createElement('div');
            elKarte.className = 'karte';
            spielFeld.append(elKarte);
            let bild = document.createElement('img');


            bild.src = karten[i].pfad;

            elKarte.append(bild);
            elKarte.addEventListener('click', bildSehen);
            elKarte.dataset.id = karten[i].id;
        }
        spielStart = false;
        btnStart.textContent = "Spiel beenden";
        paarGefunden = 0;
    }

    const beenden = () => {
        spielStart = true;
        spielFeld.innerHTML = "";
        btnStart.textContent = "Start";
        init();
    }

    const bildSehen = (evt) => {
        const aktuelleKarte = evt.currentTarget;
        aktuelleKarte.classList.add('open');
        zweiKartenVergleich.push(aktuelleKarte);
        if (zweiKartenVergleich.length === 2) {
            bilderVergleichen(zweiKartenVergleich[0], zweiKartenVergleich[1]);
        }
    }

    const bilderVergleichen = (ersteKarte, zweiteKarte) => {
        zweiKartenVergleich = [];
        if (ersteKarte.dataset.id === zweiteKarte.dataset.id) {
            console.log(paarGefunden++);
            ersteKarte.classList.add("paar");
            zweiteKarte.classList.add("paar");
            if (paarGefunden >=8) {
                console.log('Du hast gewonnen!');
                spielGewonnen();
            };
        } else {
            setTimeout(() => {
                ersteKarte.classList.remove("open");
                zweiteKarte.classList.remove("open");
            }, 1500);
        }
    }



    const zeigeRegeln = () => {
        document.getElementById("regeln").classList.toggle("show");
    }

    document.getElementById("btnRegeln").onclick = zeigeRegeln;

    // Kartenspiel starten
    btnStart.addEventListener("click", () => {
        spielStart ? zeichen() : beenden();
    });


    // Kartenspiel gewonnen
    const spielGewonnen = () => {
        let gewonnen = document.createElement('div');
        gewonnen.className = 'gewonnen';
        spielFeld.append(gewonnen);
        gewonnen.innerHTML = "Herzlichen Glückwunsch!<br> Du hast das Spiel gewonnen!"
    }



    //Initialisierung
    init();



});



console.log(karten);


