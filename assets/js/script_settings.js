const settingsPage2 = document.getElementById('settings')
const quizPage = document.getElementById('quiz')

/* IMPOSTAZIONE DIFFICOLTA' E NUMERO DOMANDE*/
const startButton = document.querySelector(".start_button");

startButton.addEventListener("click", function () {
  const selectedDifficultyInput = document.querySelector('input[name="difficulty"]:checked');
  const difficulty = selectedDifficultyInput.value;
  sessionStorage.setItem('difficulty',difficulty)

    const selectedQuestionsNumberInput = document.querySelector('input[name="question-number"]:checked');
    const number = selectedQuestionsNumberInput.value;
    sessionStorage.setItem('n',number)
    
    settingsPage2.classList.add('hidden')
    quizPage.classList.remove('hidden')
  });

  
                    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
