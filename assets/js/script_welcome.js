// Seleziona gli elementi necessari dal DOM
const check = document.querySelector(".check");
const button = document.querySelector(".proceed_button");
const alerta = document.querySelector(".alert");
const welcomePage = document.getElementById('welcome')
const settingsPage = document.getElementById('settings')

// Aggiungi un ascoltatore di eventi al checkbox
check.addEventListener("click", () => {
  // Se il checkbox è già stato cliccato, rimuovi la classe 'clicked' e svuota l'HTML interno
  if (check.classList.contains("clicked")) {
    check.classList.remove("clicked");
    check.innerHTML =''
  }
  // Altrimenti, aggiungi la classe 'clicked', inserisci un'icona di spunta nell'HTML interno e nascondi il messaggio di avviso
  else {
    check.classList.add("clicked");
    check.innerHTML = '<ion-icon name="checkmark-sharp" class="checkmark"></ion-icon>';
    alerta.classList.add("hidden");
  }
});

// Aggiungi un ascoltatore di eventi al pulsante
button.addEventListener("click", (e) => {
  // Preveni il comportamento predefinito del pulsante
  e.preventDefault();
  // Se il checkbox non è stato cliccato, mostra il messaggio di avviso
  if (!check.classList.contains("clicked")) alerta.classList.remove("hidden");
  // Altrimenti, nascondi la pagina di benvenuto e mostra la pagina delle impostazioni
  else {
    welcomePage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
  }
});
