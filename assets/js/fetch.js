// Effettua la richiesta fetch
fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy')
  .then(response => {
    // Controlla se la richiesta è andata a buon fine
    if (!response.ok) {
      throw new Error('Errore nella richiesta fetch');
    }
    // Parsa la risposta come JSON
    return response.json();
  })
  .then(data => {
    // Ora hai accesso ai dati sotto forma di oggetto JavaScript
    // Puoi assegnarli a una variabile oggetto
    const questions = data;
    return questions
    // Puoi fare ciò che vuoi con l'oggetto dati qui
  })
console.log(questions)