// Ottiene i riferimenti agli elementi HTML
const settingsPage2 = document.getElementById('settings'); // Pagina delle impostazioni
const quizPage = document.getElementById('quiz'); // Pagina del quiz

// Imposta la difficoltà predefinita e il numero di domande predefinito nella sessionStorage
sessionStorage.setItem('difficulty','easy'); // Impostare la difficoltà predefinita su "easy"
sessionStorage.setItem('n',10); // Impostare il numero di domande predefinito su 10

/* Gestione dell'impostazione della difficoltà e del numero di domande */
const startButton = document.querySelector(".start_button"); // Seleziona il pulsante di avvio

startButton.addEventListener("click", function () {
  // Ottiene l'input selezionato per la difficoltà
  const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
  const difficulty = selectedDifficultyInput.value; // Ottiene il valore della difficoltà selezionata
  sessionStorage.setItem('difficulty', difficulty); // Imposta la difficoltà selezionata nella sessionStorage

  // Ottiene l'input selezionato per il numero di domande
  const selectedQuestionsNumberInput = document.querySelector('input[name="question-number"]:checked');
  const number = selectedQuestionsNumberInput.value; // Ottiene il valore del numero di domande selezionato
  sessionStorage.setItem('n', number); // Imposta il numero di domande selezionato nella sessionStorage
  
  // Nasconde la pagina delle impostazioni e mostrare la pagina del quiz
  settingsPage2.classList.add('hidden'); // Nascondere la pagina delle impostazioni
  quizPage.classList.remove('hidden'); // Mostrare la pagina del quiz
  
  // Esegue il fetch delle domande
  getFetch(); 
});
