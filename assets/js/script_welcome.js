const check = document.querySelector(".check");
const button = document.querySelector(".proceed_button");
const alerta = document.querySelector(".alert");

const welcomePage = document.getElementById('welcome')
const settingsPage = document.getElementById('settings')


  check.addEventListener("click", () => {
  if (check.classList.contains("clicked")) {
    check.classList.remove("clicked");
    check.innerHTML =''
  }
  else {
    check.classList.add("clicked");
    check.innerHTML = '<ion-icon name="checkmark-outline" class="checkmark"></ion-icon>';
    alerta.classList.add("hidden");
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (!check.classList.contains("clicked")) alerta.classList.remove("hidden");
  else {
    welcomePage.classList.add('hidden');
    settingsPage.classList.remove('hidden');

    
  }
});

