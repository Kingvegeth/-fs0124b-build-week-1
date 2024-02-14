const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    allAnswers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
      "Central Processing Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    allAnswers: ["Static", "Final", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    allAnswers: ["True", "False",],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    allAnswers: ["True", "False",],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    allAnswers: [".svg", ".png", ".jpeg", ".gif",],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    allAnswers: [
      "Counter Strike: Source",
      "Cascading Style Sheet",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    allAnswers: [
      "Ice Cream Sandwich",
      "Nougat",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    allAnswers: ["140", "120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    allAnswers: ["True", "False",],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    allAnswers: ["Python", "C", "Jakarta", "Java",],
  },
];

/* aggancia il wrapper che conterrà il titolo della domanda generata e crea
un altro container che conterràle risposte possibili */
function generateQuestions() {
  let wrapper = document.getElementById('questionWrapper');
  wrapper.innerHTML = `
  <div id="question">
    <h2 id="taskTitle">${randomQuestions[currentQuestion].question}</h2>
  </div>
<div id="answer" class="align-center"></div>
  `;

  /*aggancia il container precedentemente generato tramite il for loop partendo da indice = 0, ovvero currentQuestion si cicla per tutta la lunghezza 
del array allAnswer all'interno dell'oggetto */
  let containerQuestion = document.getElementById('answer');
  for (let i = 0; i < randomQuestions[currentQuestion].allAnswers.length; i++) {
    containerQuestion.innerHTML += `
    <div class="option">${randomQuestions[currentQuestion].allAnswers[i]}</div>
    `;
  }
 
  /* utilizzando il template literal inietta nel wrapper il valore*/
  wrapper.innerHTML += `
  <div id="currentQuestion">Domanda ${currentQuestion + 1} <span>/ 10</span></div>
  `
  /*prendi ogni singola opzione tra le quattro, e aggiungi eventListener*/
  let option = document.getElementsByClassName('option');

  for (let i = 0; i < option.length; i++) {
    let element = option[i];
    element.addEventListener("click", () => {
      nextQuestion(element.innerHTML);
      
    })
  }
};

/* controlla se l'array delle risposte è più corto, se la condizione è vera la stringa all'interno del contenitore option viene pushata. l'indice aumenta di 1 */
let nextQuestion = function (string) {
  if (userAnswers.length < randomQuestions.length-1) {
  userAnswers.push(string);
  console.log(userAnswers);
  currentQuestion += 1;
  generateQuestions(currentQuestion, userAnswers);
  resetTimer();
}
  else {
  userAnswers.push(string);
  console.log(userAnswers);
  stopTimer();
  let wrapper = document.getElementById('questionWrapper');
  wrapper.remove();
  let orologio = document.getElementById('timerWrapper')
  orologio.remove();
  let progressBar = document.getElementById('progressBar');
  progressBar.remove();
  result();
  }
};

/*aggancia il main, inizializza due variabile, cicla la lunghezza dell'array, se la risposta pushata nell'array userAnswers è uguale il valore della variabile
rightAnswer incrementa di 1*/
function result () {
  let main = document.getElementById('main');
  let rightAnswers = 0;
  let wrongAnswers = 0;
  for(let i=0; i < randomQuestions.length; i++) {
    if (randomQuestions[i].correct_answer == userAnswers[i]){
      rightAnswers+=1;
    } else {
      wrongAnswers+=1;
    }
  }

  /*viene stabilito tramite template literal il nuovo HTML che avrà la pagina risultato, inserendo il calcolo in percentuale delle risposta giuste/sbagliate*/
  main.innerHTML =`
<div>
  <h2 class="evidence">Results</h2> 
  <p class="subTitle">The summary of your answer: </p> 
</div>

<div id="flexContainer">

  <div class="Answers align-left">
   Correct <br> <span class="evidence"> ${(rightAnswers / randomQuestions.length)*100}% </span>
   <p class="miniTitle"> ${rightAnswers}/${randomQuestions.length} questions </p> 
  </div>

  <div id="answerText" class="flex">
  <canvas id="resultChart"></canvas>
  <div id="textResult"></div>
  </div>

  <div class="Answers align-right">
    Wrong <br> <span class="evidence"> ${(wrongAnswers / randomQuestions.length)*100}% </span>
    <p class="miniTitle"> ${wrongAnswers}/${randomQuestions.length} questions </p> 
  </div>

</div>

<div>
  <form action = "#">
    <button id="resultButton"> RATE US </button>
  </form>
</div>
  `;

  /* viene dichiarata una variabile alla quale verrà assegnato un valore differente a seconda del numero di risposte esatte,
  se maggiori o uguale a 5 verrà mostrato un messaggio, altrimenti un altro. La variabile teste che contiene i messaggi sarà,
  utilizzata come valore del div con id answerText precedentemente generato*/
  let testo; 

  if ( rightAnswers >= 5 ) {
    testo =` <span class="color"> <span class="resultDonut"> Congratulations!</span><p>You passed the exam.</p> </span><p class="instructions">We'll send you the certificate in few minutes.</p><p class="instructions"> Check your email (including promotions/spam folder)</p>`
  } else {
    testo = ` <span class="color"> <span class="resultDonut"> Sorry! </span> <br> You didn't pass the exam.</span>`
  }

  const textResult = document.getElementById("textResult"); 
  textResult.innerHTML = testo;

  donutChart(wrongAnswers , rightAnswers ) 
}

/* imposta un intervallo di 1000 millisecondi*/
function startTimer () {
  timerInterval = setInterval(function() {updateTimer();}, 1000);
}

//comando contratio
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
  let tempIndex = temp.length
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
  currentQuestion=0;
  randomize();
  generateQuestions();

  timerSeconds = 30;

  donutTimer(timerSeconds);
  let clock = document.getElementById('timerDiv')
  clock.innerHTML=timerSeconds;

  timerSeconds--;
  startTimer();
  
};