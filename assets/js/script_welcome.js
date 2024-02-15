const check = document.querySelector(".check");
const button = document.querySelector(".proceed_button");
const alerta = document.querySelector(".alert");


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
  e.preventDefault()
  if (!check.classList.contains("clicked")) alerta.classList.remove("hidden");
  else{
    window.location = "settings.html";
  }
});
