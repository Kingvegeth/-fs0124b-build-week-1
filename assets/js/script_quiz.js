// Variabili per memorizzare le domande, le risposte corrette e sbagliate, la difficoltà e il numero di domande
let questions = [];
let rightAnswersList = [];
let wrongAnswersList = [];
let difficulty = sessionStorage.getItem('difficulty') || "easy";
let questionsNumber = sessionStorage.getItem('n') || "15";
let correctThreshold = Math.ceil(questionsNumber / 2);

// Funzione per generare le domande e le risposte
function generateQuestions() {
  let wrapper = document.getElementById('questionWrapper');

  // Verifica se ci sono domande disponibili
  if (questions.results && questions.results.length > 0) {
    let currentQuestionObj = questions.results[currentQuestion];

    // Inserisce la domanda nell'HTML
    wrapper.innerHTML = `
      <div id="question">
        <h2 id="taskTitle">${currentQuestionObj.question}</h2>
      </div>
      <div id="answer" class="align-center"></div>
    `;

    let containerQuestion = document.getElementById('answer');

    // Combina risposte corrette e scorrette in un array e le mescola
    let allAnswers = currentQuestionObj.incorrect_answers.concat(currentQuestionObj.correct_answer);
    allAnswers = shuffleArray(allAnswers);

    // Visualizza le risposte possibili
    for (let i = 0; i < allAnswers.length; i++) {
      containerQuestion.innerHTML += `
        <div class="option">${allAnswers[i]}</div>
      `;
    }

    // Visualizza il numero della domanda corrente
    wrapper.innerHTML += `
      <div id="currentQuestion">QUESTION ${currentQuestion + 1} <span>/ ${questionsNumber}</span></div>
    `;

    // Aggiunge event listeners alle opzioni di risposta
    let option = document.getElementsByClassName('option');
    for (let i = 0; i < option.length; i++) {
      let element = option[i];
      element.addEventListener("click", () => {
        nextQuestion(element.innerHTML);
      });
    }
  } else {
    console.error("Nessun risultato valido ottenuto dalla richiesta.");
  }
}

// Funzione per mescolare un array in modo casuale
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Funzione per trovare un'opzione di risposta basata sul testo
function findOptionByText(text) {
  let options = document.querySelectorAll('.option');
  return Array.from(options).find(option => option.textContent.includes(text));
}

// Gestore per la prossima domanda
let nextQuestion = function (string) {
  userAnswers.push(string);

  let correctAnswer = questions.results[currentQuestion].correct_answer;
  let selectedOption = findOptionByText(string);

  if (selectedOption) {
    // Visualizza la risposta selezionata correttamente o erroneamente
    if (string === correctAnswer) {
      selectedOption.style.background = 'linear-gradient(180deg, rgba(0,255,0,0.7315301120448179) 0%, rgba(1,97,1,1) 100%)';
    } else {
      selectedOption.style.background = 'linear-gradient(180deg, rgba(255,0,0,0.7315301120448179) 0%, rgba(97,1,1,1) 100%)';
    }

    // Passa alla prossima domanda dopo un certo periodo di tempo
    setTimeout(() => {
      selectedOption.style.background = '';

      if (currentQuestion < questions.results.length - 1) {
        currentQuestion += 1;
        generateQuestions();
        resetTimer();
      } else {
        stopTimer();
        let wrapper = document.getElementById('questionWrapper');
        wrapper.remove();
        let orologio = document.getElementById('timerWrapper');
        orologio.remove();
        let progressBar = document.getElementById('progressBar');
        progressBar.remove();
        result();
      }
    }, 800);
  } else {
    console.error("Opzione non trovata per il testo:", string);
  }
};

// Funzione per visualizzare i risultati del quiz
function result() {
  let main = document.getElementById('main');
  let rightAnswers = 0;
  let wrongAnswers = 0;

  // Calcola il numero di risposte corrette e sbagliate
  for (let i = 0; i < questions.results.length; i++) {
    let userAnswer = userAnswers[i];
    let correctAnswer = questions.results[i].correct_answer;

    if (userAnswer === correctAnswer) {
      rightAnswers += 1;
      rightAnswersList.push(userAnswer);
    } else {
      wrongAnswers += 1;
      wrongAnswersList.push(userAnswer);
    }
  }

  // Visualizza i risultati
  main.innerHTML = `
    <div>
      <h2 class="evidence">Results</h2> 
      <p class="subTitle">The summary of your answer: </p> 
    </div>

    <div id="flexContainer">
      <div class="Answers align-left">
        Correct <br> <span class="evidence"> ${Math.floor((rightAnswers / questions.results.length) * 100)}% </span>
        <p class="miniTitle"> ${rightAnswers}/${questions.results.length} questions </p> 
      </div>

      <div id="answerText" class="flex">
        <div class=ring-shadow><canvas id="resultChart"></canvas></div>
        <div id="textResult"></div>
      </div>

      <div class="Answers align-right">
        Wrong <br> <span class="evidence"> ${Math.ceil((wrongAnswers / questions.results.length) * 100)}% </span>
        <p class="miniTitle"> ${wrongAnswers}/${questions.results.length} questions </p> 
      </div>
    </div>

    <div>
      <form>
        <button id="resultButton"> RATE US </button>
      </form>
    </div>
  `;

  // Mostra la pagina di feedback al click del bottone "RATE US"
  const quizPage2 = document.getElementById('quiz');
  const feedbackPage = document.getElementById('feedback-container');
  const rateUsButton = document.getElementById('resultButton');

  rateUsButton.addEventListener('click', (e) => {
    e.preventDefault();
    quizPage2.classList.add('hidden');
    feedbackPage.classList.remove('hidden');
  });

// Imposta il testo dei risultati in base al superamento o meno dell'esame
let testo;
if (rightAnswers >= correctThreshold) {
  testo = `<span class="color"><span class="resultDonut"> Congratulations!</span><p>You passed the exam.</p> </span><p class="instructions">We'll send you the certificate in few minutes.</p><p class="instructions"> Check your email (including promotions/spam folder)</p>`;
} else {
  testo = ` <span class="color"> <span class="resultDonut"> Sorry! </span> <br> You didn't pass the exam.</span>`;
  document.body.style.backgroundImage = "url(./assets/img/bg2.jpg)";
}

// Aggiorna il testo dei risultati nella pagina HTML
const textResult = document.getElementById("textResult");
textResult.innerHTML = testo;

// Genera il grafico a ciambella dei risultati
donutChart(wrongAnswers, rightAnswers);
}

// Avvia il timer
function startTimer () {
timerInterval = setInterval(function() {updateTimer();}, 1000);
}

// Ferma il timer
function stopTimer () {
clearInterval(timerInterval);
}

// Aggiorna il timer
function updateTimer() {
reloadTimerHtml();
if (timerSeconds == 0) {
timerColor = "#00FFFF"
resetTimer()
currentQuestion += 1;
nextQuestion(null)
generateQuestions()}
else {timerSeconds--;}
};

/* Ferma il timer, reimposta il valore a 30 secondi, aggiorna la visualizzazione del timer e fa ripartire il timer */
function resetTimer() {
stopTimer();
timerSeconds = 30;
reloadTimerHtml();
timerSeconds--;
startTimer(); 
}

/* Aggiorna la visualizzazione del timer nell'HTML */
function reloadTimerHtml() {
let clock = document.getElementById('timerDiv');
if (timerSeconds > 9){
clock.innerHTML=timerSeconds;
}else {
let stringNumber =`&nbsp;${timerSeconds}`;
clock.innerHTML=stringNumber;
}

let progressBar = document.getElementById('progressBar');
let percentage = (timerSeconds / 30) * 100;
progressBar.style.width = percentage + '%';
donutTimer(timerSeconds);
}

/* Randomizza l'ordine delle domande */
function randomize() {
let tempIndex = temp.length;
for (let i = 0; i < tempIndex; i++) {
let randValue = Math.floor(Math.random() * temp.length);
randomQuestions.push(temp[randValue]);
temp.splice(randValue, 1);
}
}

let timerColor = "#00FFFF" //Inizializza il colore base del timer


//Richiama il timer, e gestisce il cambio di colore in base al tempo
function donutTimer(timerSeconds) {
let avanzo = (30-timerSeconds);
let xValues = ["Tempo rimanente", "Tempo passato"];
let yValues = [ avanzo,timerSeconds];
if(timerSeconds<=30&&timerSeconds>20) {
timerColor = "#00FFFF"
progressBar.style.backgroundColor = timerColor} 
else if(timerSeconds<=20&&timerSeconds>10) {
timerColor = "#ffd966"
progressBar.style.backgroundColor = timerColor}
else if(timerSeconds<=10) {
timerColor = "#d93737"
progressBar.style.backgroundColor = timerColor
}
let barColors = ["#98699C", timerColor];

// Crea il grafico a ciambella per il timer
new Chart("timerChart", {
type: "doughnut",
data: {
labels: xValues,
datasets: [{
backgroundColor: barColors, 
borderColor: "rgba(0, 0, 0, 0)" , 
data: yValues ,
}]
},
options: {
title: { display: false },
cutoutPercentage: 75,                       
legend: {display : false},

animation: {
animateRotate: false,
animateScale: false,
},
events: [],
}
});
}
function donutChart(wrongAnswers, rightAnswers) {
let xValues = ["Wrong Answers", "Right Answers"];
let yValues = [wrongAnswers, rightAnswers];
let barColors = ["#C2128D", "#00FFFF"]


//Crea il grafico a ciambella dei risultati
new Chart("resultChart", {
type: "doughnut",
data: {
labels: xValues,
datasets: [{
backgroundColor: barColors, 
borderColor: "rgba(0, 0, 0, 0)" , 
data: yValues ,

}]
},
options: {
title: { display: false },
cutoutPercentage: 75,                       
legend: {display : false},
circumference : 2*Math.PI
}
})
};

/*
1)TimerSeconds = utilizzata per storare il valore del timer in un determinato momento;
2)TimerInterval = utilizzata per storare il timer in se;
3)UserAnswer = è l'array riempito man mano dalle scelte dell'utente;
4)Temp è l'array "clone" di questions, utilizzato per randomizzazione delle domande generate a schermo,
se avessimo usata l'array originale per generare le domande, non avremmo potuto far un confronto tra le rispsote dell'utente*/
let timerSeconds;
let timerInterval;
let userAnswers = [];
let currentQuestion;
let temp = [...questions];
let randomQuestions = [];

/*
1)Setta valore di currentQuestion;
2)Avvia la randomizzazione della domanda:
3)Genera domanda e risposta corrispondente a schermo;
4)Imposta il timer a 30 secondi;
5)Aggancia il div con id timer dichiarandolo nella variabile;
6)Imposta il valore di clock uguale alla variabile timerSecond;
7)Imposta decremento secondi;
8)Inizializza il timer*/
  currentQuestion = 0;

  // Fetch delle domande da un URL esterno
function getFetch(params) {

  difficulty = sessionStorage.getItem('difficulty')
  questionsNumber = sessionStorage.getItem('n')
  correctThreshold = Math.ceil(questionsNumber / 2);
  fetch(`https://opentdb.com/api.php?amount=${questionsNumber}&category=18&difficulty=${difficulty}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
    
  })
  .then(data => {
    // Assegna le domande ottenute alla variabile questions
    questions = data;
    randomize();
    generateQuestions();
    
    timerSeconds = 30;
    
    donutTimer(timerSeconds);
    let clock = document.getElementById('timerDiv');
    clock.innerHTML = timerSeconds;
    
    timerSeconds--;
    startTimer();
  });
}
  
