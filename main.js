let compute_placeholder = document.querySelector("#comp_placeholder");
let container_provided_by_user_elements =
  document.querySelector("#ct_prov_by_user");

let radios = document.querySelectorAll(".form-check-input");
let textarea = document.querySelector("#first_ta");

let getref = document.querySelector("#getref");
let usr_ref = document.querySelector("#usr_ref");

let dropdown = document.querySelector("#dropdownSelect");
let format_option = document.querySelector("#format_option");

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

// stampo il titolo in base al formato della biografia
getref.addEventListener("click", () => {
  if (radios[1].checked) {
    selected_format = dropdown.value
    if (selected_format === "1") {
      console.log("Hai selezionato lo stile APA.");
    } else if (selected_format === "2") {
      console.log("Hai selezionato Bibliatex.");
    } else {
      console.log("Seleziona un formato di riferimento.");
    }
  }
});
