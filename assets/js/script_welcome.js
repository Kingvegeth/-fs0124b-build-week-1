const check = document.querySelector(".check");
const button = document.querySelector(".proceed_button");
const alerta = document.querySelector(".alert");

check.addEventListener("click", () => {
  if (check.classList.contains("clicked")) check.classList.remove("clicked");
  else {
    check.classList.add("clicked");
    alerta.classList.add("hidden");
  }
});

button.addEventListener("click", (e) => {
  e.preventDefault()
  if (!check.classList.contains("clicked")) alerta.classList.remove("hidden");
});
