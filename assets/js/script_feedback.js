// Funzione per creare e visualizzare le stelle di valutazione
function createStars() {
  let starContainer = document.getElementById("rating"); // Ottiene il contenitore delle stelle
  // Ciclo per creare le stelle
  for (let i = 0; i < 10; i++) {
    // Aggiunge un'immagine di stella al contenitore
    starContainer.innerHTML += `<img src="./assets/img/star.svg" alt="stellina rating" class="opacityStar star">`;
  }
}

// Funzione per gestire l'interazione con le stelle di valutazione
function feedbackStars() {
  let stars = document.querySelectorAll("#rating img"); // Ottiene tutte le stelle
  let lastclicked; // Memorizza l'indice dell'ultima stella cliccata
  let clicked = false; // Indica se una stella è stata cliccata o meno

  // Itera su tutte le stelle
  stars.forEach(function (star, index) {
    // Gestisce l'evento di click su ogni stella
    star.addEventListener("click", function () {
      if (clicked == false && lastclicked != index) {
        // Se nessuna stella è stata cliccata e questa stella non è stata l'ultima cliccata
        lastclicked = index;
        clicked = true;

        // Aggiunge la classe "opacityStar" a tutte le stelle
        stars.forEach(function (s) {
          s.classList.add("opacityStar");
        });

        // Rimuove la classe "opacityStar" solo dalle stelle fino a quella cliccata
        for (let i = 0; i <= index; i++) {
          stars[i].classList.remove("opacityStar");
        }
      }
      // else if funziona dal secondo click in poi
      else if (clicked == true && lastclicked != index) {
        lastclicked = index;

        stars.forEach(function (s) {
          s.classList.add("opacityStar");
        });

        for (let i = 0; i <= index; i++) {
          stars[i].classList.remove("opacityStar");
        }
      } else if (lastclicked == index) {
        clicked = false;
      }
    });

    // Gestisce l'evento di passaggio del mouse su ogni stella
    star.addEventListener("mouseover", function () {
      if (clicked == false) {
        // Se non è stato cliccato, colora la stella e le precedenti
        for (let i = 0; i <= index; i++) {
          stars[i].classList.remove("opacityStar");
        }
      }
    });

    // Gestisce l'evento di uscita del mouse da ogni stella
    star.addEventListener("mouseout", function () {
      if (clicked == false) {
        // Se non è stato cliccato, reimposta tutte le stelle a trasparenti
        stars.forEach(function (s) {
          s.classList.add("opacityStar");
        });
      }
    });
  });
}

// Chiamate alle funzioni per creare e gestire le stelle di valutazione
createStars();
feedbackStars();
