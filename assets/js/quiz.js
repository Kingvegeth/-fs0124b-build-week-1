let questions = [];
let rightAnswersList = []
let wrongAnswersList = []
let difficulty = sessionStorage.getItem('difficulty')
let questionsNumber = sessionStorage.getItem('n')
let correctThreshold = Math.ceil(questionsNumber/2)

/* aggancia il wrapper che conterrà il titolo della domanda generata e crea
un altro container che conterràle risposte possibili */
function generateQuestions() {
  let wrapper = document.getElementById('questionWrapper');

  if (questions.results && questions.results.length > 0) {
    let currentQuestionObj = questions.results[currentQuestion];

    wrapper.innerHTML = `
      <div id="question">
        <h2 id="taskTitle">${currentQuestionObj.question}</h2>
      </div>
      <div id="answer" class="align-center"></div>
    `;

    let containerQuestion = document.getElementById('answer');
    for (let i = 0; i < currentQuestionObj.incorrect_answers.length; i++) {
      containerQuestion.innerHTML += `
        <div class="option">${currentQuestionObj.incorrect_answers[i]}</div>
      `;
    }

    containerQuestion.innerHTML += `
      <div class="option">${currentQuestionObj.correct_answer}</div>
    `;

    wrapper.innerHTML += `
      <div id="currentQuestion">Domanda ${currentQuestion + 1} <span>/ ${questionsNumber}</span></div>
    `;

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

function findOptionByText(text) {
  let options = document.querySelectorAll('.option');
  return Array.from(options).find(option => option.textContent.includes(text));
}

let nextQuestion = function (string) {
  userAnswers.push(string);

  let correctAnswer = questions.results[currentQuestion].correct_answer;
  let selectedOption = findOptionByText(string);

  if (selectedOption) {
    if (string === correctAnswer) {
      selectedOption.style.background = 'linear-gradient(180deg, rgba(0,255,0,0.7315301120448179) 0%, rgba(1,97,1,1) 100%)';
    } else {
      selectedOption.style.background = 'linear-gradient(180deg, rgba(255,0,0,0.7315301120448179) 0%, rgba(97,1,1,1) 100%)';
    }

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
    }, 1000);
  } else {
    console.error("Opzione non trovata per il testo:", string);
  }
};


/*aggancia il main, inizializza due variabile, cicla la lunghezza dell'array, se la risposta pushata nell'array userAnswers è uguale il valore della variabile
rightAnswer incrementa di 1*/
function result() {
  let main = document.getElementById('main');
  let rightAnswers = 0;
  let wrongAnswers = 0;

  for (let i = 0; i < questions.results.length; i++) {
    let userAnswer = userAnswers[i];
    let correctAnswer = questions.results[i].correct_answer;

    if (userAnswer === correctAnswer) {
      rightAnswers += 1;
      rightAnswersList.push(userAnswer)
    } else {
      wrongAnswers += 1;
      wrongAnswersList.push(userAnswer)
    }
  }
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
  <canvas id="resultChart"></canvas>
  <div id="textResult"></div>
  </div>
  
  <div class="Answers align-right">
  Wrong <br> <span class="evidence"> ${Math.ceil((wrongAnswers / questions.results.length) * 100)}% </span>
  <p class="miniTitle"> ${wrongAnswers}/${questions.results.length} questions </p> 
  </div>
  
  </div>
  
  <div>
  <form action="feedback.html">
  <button id="resultButton"> RATE US </button>
  </form>
  </div>
  `;
  
  let testo;
  
  if (rightAnswers >= correctThreshold) {
    testo = `<span class="color"><span class="resultDonut"> Congratulations!</span><p>You passed the exam.</p> </span><p class="instructions">We'll send you the certificate in few minutes.</p><p class="instructions"> Check your email (including promotions/spam folder)</p>`;
  } else {
    testo = ` <span class="color"> <span class="resultDonut"> Sorry! </span> <br> You didn't pass the exam.</span>`;
  }

  const textResult = document.getElementById("textResult");
  textResult.innerHTML = testo;

  donutChart(wrongAnswers, rightAnswers);
}

/* imposta un intervallo di 1000 millisecondi*/
function startTimer () {
  timerInterval = setInterval(function() {updateTimer();}, 1000);
}

function stopTimer () {
  clearInterval(timerInterval);
}

/*La funzione updateTimer esegue un refresh a video di timer e progress bar tramite la funzione reloadTimerHTML,imposta la condizione secondo la quale se il timer arriva allo zero,
la funzione nextQuestion avrà come parametro null invece di string, perciò verrà pushato un valore null nell'array poiche non è stata effettuata alcuna scelta da parte dell'utente*/
function updateTimer() {

  reloadTimerHtml();
  if (timerSeconds == 0) {nextQuestion(null);}
  else {timerSeconds--;}
  
};

/*1)ferma il tempo richiamando la funzione stopTimer;
2)imposta il valore di timerSeconds a 30;
3)esegue un refresh a video di timer a progress bar tramite la funzione reloadTimerHtml;
4)imposta il decremento dei secondi di timerSecond;
5)fa ripartire il tempo tramite la funzione start Timer;*/
function resetTimer() {
  stopTimer();
  timerSeconds = 30;
  reloadTimerHtml();
  timerSeconds--;
  startTimer(); 
  
}

/*applica il dvi con id timer nell?html nella variabile clock, imposta il valore di clock con timersecond, aggancia il div con id progressBar basandosi sul valore di timer second,
tale valore servirà a stabilire la percentuale di riduzione della larghezza della progressBar*/
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

/*1)dichiara che la variabile tempIndex è uguale alla lunghezza dell'arraytemp
2)cicla l'array
3)dichiara che randValue sia un numero casuale 
4)pusha nell'array randomQuestions la domanda selezionata randomicamente
5)per far si che non vengano estratti doppioni è necessario utilizzare splice, che ci permette di togliere 1 elemento corrispondente nell'array al numero generato,
splice in questo caso è in una gioiosa collaborazione con randValue, perchè ogni volta che un numero viene generato viene anche automaticamente rimosso.*/
function randomize() {
  let tempIndex = temp.length;
  for (let i = 0; i < tempIndex; i++) {
    let randValue = Math.floor(Math.random() * temp.length);
    randomQuestions.push(temp[randValue]);
    temp.splice(randValue, 1);
  }
}
function donutTimer(timerSeconds) {
  let avanzo = (30-timerSeconds);
  let xValues = ["Tempo rimanente", "Tempo passato"];
  let yValues = [ avanzo,timerSeconds];
  let barColors = ["#98699C", "#00FFFF"];


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
1)timerSeconds = utilizzata per storare il valore del timer in un determinato momento;
2)timerInterval = utilizzata per storare il timer in se;
3)userAnswer = è l'array riempito man mano dalle scelte dell'utente;
4)temp è l'array "clone" di questions, utilizzato per randomizzazione delle domande generate a schermo,
se avessimo usata l'array originale per generare le domande, non avremmo potuto far un confronto tra le rispsote dell'utente*/
let timerSeconds;
let timerInterval;
let userAnswers = [];
let currentQuestion;
let temp = [...questions];
let randomQuestions = [];

/*
1)setta valore di currentQuestion;
2)avvia la randomizzazione della domanda:
3)genera domanda e risposta corrispondente a schermo;
4)imposta il timer a 30 secondi;
5)aggancia il div con id timer dichiarandolo nella variabile;
6)imposta il valore di clock uguale alla variabile timerSecond;
7)imposta decremento secondi;
8)inizializza il timer*/
window.onload = function () {
  currentQuestion = 0;

  // Fetch delle domande da un URL esterno
  fetch(`https://opentdb.com/api.php?amount=${questionsNumber}&category=18&difficulty=${difficulty}`)
  .then(response => response.json())
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