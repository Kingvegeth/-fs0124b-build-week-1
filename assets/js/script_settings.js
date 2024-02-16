// Ottenere i riferimenti agli elementi HTML
const settingsPage2 = document.getElementById('settings'); // Pagina delle impostazioni
const quizPage = document.getElementById('quiz'); // Pagina del quiz

// Impostare la difficoltà predefinita e il numero di domande predefinito nella sessionStorage
sessionStorage.setItem('difficulty','easy'); // Impostare la difficoltà predefinita su "easy"
sessionStorage.setItem('n',10); // Impostare il numero di domande predefinito su 10

/* Gestione dell'impostazione della difficoltà e del numero di domande */
const startButton = document.querySelector(".start_button"); // Selezionare il pulsante di avvio

startButton.addEventListener("click", function () {
  // Ottenere l'input selezionato per la difficoltà
  const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
  const difficultyValue = selectedDifficultyInput.value; // Ottenere il valore della difficoltà selezionata
  sessionStorage.setItem('difficulty', difficultyValue); // Impostare la difficoltà selezionata nella sessionStorage

  // Ottenere l'input selezionato per il numero di domande
  const selectedQuestionsNumberInput = document.querySelector('input[name="question-number"]:checked');
  const number = selectedQuestionsNumberInput.value; // Ottenere il valore del numero di domande selezionato
  sessionStorage.setItem('n', number); // Impostare il numero di domande selezionato nella sessionStorage
  
  // Nascondere la pagina delle impostazioni e mostrare la pagina del quiz
  settingsPage2.classList.add('hidden'); // Nascondere la pagina delle impostazioni
  quizPage.classList.remove('hidden'); // Mostrare la pagina del quiz
  

  getFetch(); 
});
