import  extract_titles  from "./function_js/extract_title.js";

let compute_placeholder = document.querySelector("#comp_placeholder");
let container_provided_by_user_elements =
  document.querySelector("#ct_prov_by_user");

let radios = document.querySelectorAll(".form-check-input");
let textarea = document.querySelector("#first_ta");

let getref = document.querySelector("#getref");
let usr_ref = document.querySelector("#usr_ref");

let dropdown = document.querySelector("#dropdownSelect");

let result = document.querySelector("#result");

// abilito tooltip
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

// veririco se [cit] occore nel textbox iniziale per far apparire compute placeholder o meno
textarea.addEventListener("blur", () => {
  if (textarea.value.includes("[cit]")) {
    compute_placeholder.classList.add("d-none");
  } else {
    compute_placeholder.classList.remove("d-none");
  }
});

// Verifico se i radio button status e prov cambiano per far apparire la sezione per l'inserimento
radios.forEach((radio, index) => {
  radio.addEventListener("change", () => {
    if (index === 0) {
      container_provided_by_user_elements.classList.add("d-none");
    } else if (index === 1) {
      container_provided_by_user_elements.classList.remove("d-none");
    }
  });
});

// stampo i titoli in base al formato della biografia
getref.addEventListener("click", () => { //al click di get references
  let titles = []
  let format = dropdown.value
  if (radios[1].checked) { // se seleziona provided by user
      titles = extract_titles(format)      
  }
  //per ogni titolo creo una riga nel div "risultato"
  result.innerHTML = ""; //lo svuoto per non sovrapporre al successivo click
  titles.forEach(title => {
    let div = document.createElement("div")
    div.classList.add("row")
    div.classList.add("my-3")
    div.classList.add("border-bottom")
    div.classList.add("border-black")
    div.innerHTML = `
        <div class="col-8 align-self-center">
          <p class="m-0">${title}</p>
        </div>
        <div class="col-4 d-flex align-items-center justify-content-center">
            <img src=${format == 1 ? "./assets/APA_icon.jpeg" : "./assets/Bibtex_icon.jpg"} alt="" class="format-logo mb-2">
        </div>
    `
    result.appendChild(div)
  });
});
